import type { Operation } from 'oas';
import type { ParameterObject } from 'oas/@types/rmoas.types';
import type { ReadStream } from 'fs';

import fs from 'fs/promises';
import path from 'path';
import stream from 'stream';
import getStream from 'get-stream';
import datauri from 'datauri/sync';
import DatauriParser from 'datauri/parser';

function digestParameters(parameters: ParameterObject[]) {
  return parameters.reduce((prev, param) => {
    if ('$ref' in param || 'allOf' in param || 'anyOf' in param || 'oneOf' in param) {
      throw new Error(`The OpenAPI document for this operation wasn't dereferenced before processing.`);
    } else if (param.name in prev) {
      throw new Error(
        `The operation you are using has the same parameter, ${param.name}, spread across multiple entry points. We unfortunately can't handle this right now.`
      );
    }

    return Object.assign(prev, { [param.name]: param });
  }, {});
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
}

function processFile(paramName: string, file: string | ReadStream) {
  if (typeof file === 'string') {
    // In order to support relative pathed files, we need to attempt to resolve them.
    const resolvedFile = path.resolve(file);

    return fs
      .stat(resolvedFile)
      .then(() => datauri(resolvedFile))
      .then(fileMetadata => {
        const payloadFilename = encodeURIComponent(path.basename(resolvedFile));

        return {
          paramName,
          base64: fileMetadata.content.replace(';base64', `;name=${payloadFilename};base64`),
          filename: payloadFilename,
          buffer: fileMetadata.buffer,
        };
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          // It's less than ideal for us to handle files that don't exist like this but because
          // `file` is a string it might actually be the full text contents of the file and not
          // actually a path.
          //
          // We also can't really regex to see if `file` *looks*` like a path because one should be
          // able to pass in a relative `owlbert.png` (instead of `./owlbert.png`) and though that
          // doesn't *look* like a path, it is one that should still work.
          return undefined;
        }

        throw err;
      });
  } else if (file instanceof stream.Readable) {
    return getStream.buffer(file).then(buffer => {
      const filePath = file.path as string;
      const parser = new DatauriParser();
      const base64 = parser.format(filePath, buffer).content;
      const payloadFilename = encodeURIComponent(path.basename(filePath));

      return {
        paramName,
        base64: base64.replace(';base64', `;name=${payloadFilename};base64`),
        filename: payloadFilename,
        buffer,
      };
    });
  }

  return new Promise((resolve, reject) => {
    reject(
      new TypeError(
        paramName
          ? `The data supplied for the \`${paramName}\` request body parameter is not a file handler that we support.`
          : `The data supplied for the request body payload is not a file handler that we support.`
      )
    );
  });
}

export default async function prepareParams(operation: Operation, body?: unknown, metadata?: Record<string, unknown>) {
  // If no data was supplied, just return immediately.
  if (isEmpty(body) && isEmpty(metadata)) {
    return {};
  }

  const params: {
    body?: any;
    cookie?: Record<string, string | number | boolean>;
    files?: Record<string, Buffer>;
    formData?: any;
    header?: Record<string, string | number | boolean>;
    path?: Record<string, string | number | boolean>;
    query?: Record<string, string | number | boolean>;
    server?: {
      selected: number;
      variables: Record<string, string | number>;
    };
  } = {};

  let shouldDigestParams = false;

  if (Array.isArray(body)) {
    // If the body param is an array, then it's absolutely a body and not something we need to do analysis against.
    params.body = body;

    if (typeof metadata !== 'undefined') {
      shouldDigestParams = true;
    }
  } else if (typeof metadata === 'undefined') {
    // No metadata was explicitly defined so we need to analyze the body to determine if it should actually be treated
    // as metadata.
    shouldDigestParams = true;
  } else {
    // Body and metadata were both supplied.
    params.body = body;
    shouldDigestParams = true;
  }

  let digested: Record<string, ParameterObject> = {};
  let metadataIntersected = false;
  let hasDigestedParams = false;
  if (shouldDigestParams) {
    digested = digestParameters(operation.getParameters());
    hasDigestedParams = !!Object.keys(digested).length;
  }

  // No metadata was explicitly defined so we need to analyze the supplied, and we haven't already set a body then we
  // need to analyze the supplied body to see if it should actually be metadata. If not, then we can just treat it as a
  // body and pass it along.
  if (!('body' in params) && typeof metadata === 'undefined') {
    if (!hasDigestedParams) {
      // No parameters were able to be digested, so we just have to assume that what the user supplied was for a body.
      // This might lead to unwanted false positives if an OAS isn't accurate, but short of throwing an error there
      // isn't anything we can really do about it.
      params.body = body;
    } else {
      const intersection = Object.keys(body).filter(value => Object.keys(digested).includes(value)).length;
      if (intersection && intersection / Object.keys(body).length > 0.25) {
        // If more than 25% of the body intersects with the parameters that we've got on hand, then we should treat it
        // as a metadata object and organize into parameters.
        // eslint-disable-next-line no-param-reassign
        metadata = body as Record<string, unknown>; // @todo we should just do a "if body isnt an object don't digest it"
        metadataIntersected = true;
      } else {
        // For all other cases, we should just treat the supplied body as a body.
        params.body = body;
      }
    }
  }

  if ('body' in params) {
    if (!operation.hasRequestBody()) {
      // If this operation doesn't have any documented request body then we shouldn't be sending
      // anything.
      delete params.body;
    } else {
      // We need to retrieve the request body for this operation to search for any `binary` format
      // data that the user wants to send so we know what we need to prepare for the final API
      // request.
      const payloadJsonSchema = operation.getParametersAsJsonSchema().find(js => js.type === 'body');
      if (payloadJsonSchema) {
        if (!params.files) {
          params.files = {};
        }

        const conversions = [];

        // @todo add support for `type: array`, `oneOf` and `anyOf`
        if (payloadJsonSchema.schema?.properties) {
          Object.entries(payloadJsonSchema.schema?.properties)
            .filter(([, schema]) => schema?.format === 'binary')
            .filter(([prop]) => Object.keys(params.body).includes(prop))
            .forEach(([prop]) => {
              conversions.push(processFile(prop, params.body[prop]));
            });
        } else if (payloadJsonSchema.schema?.type === 'string') {
          if (payloadJsonSchema.schema?.format === 'binary') {
            conversions.push(processFile(undefined, params.body));
          }
        }

        await Promise.all(conversions)
          .then(fileMetadata => fileMetadata.filter(Boolean))
          .then(fm => {
            fm.forEach(fileMetadata => {
              if (!fileMetadata) {
                // If we don't have any metadata here it's because the file we have is likely
                // the full string content of the file so since we don't have any filenames to
                // work with we shouldn't do any additional handling to the `body` or `files`
                // parameters.
                return;
              }

              if (fileMetadata.paramName) {
                params.body[fileMetadata.paramName] = fileMetadata.base64;
              } else {
                params.body = fileMetadata.base64;
              }

              params.files[fileMetadata.filename] = fileMetadata.buffer;
            });
          });
      }
    }
  }

  // Form data should be placed inside `formData` instead of `body` for it to properly get picked up.
  if (operation.isFormUrlEncoded()) {
    params.formData = body;
    delete params.body;
  }

  // Only spend time trying to organize metadata into parameters if we were able to digest parameters out of the
  // operation schema. If we couldn't digest anything, but metadata was supplied then we wouldn't know where to place
  // the metadata!
  if (hasDigestedParams) {
    params.cookie = {};
    params.header = {};
    params.path = {};
    params.query = {};

    if (typeof metadata === 'object' && !isEmpty(metadata)) {
      const metadataKeys = Object.keys(metadata);
      if (metadataKeys.length) {
        metadataKeys.forEach(param => {
          if (!(param in digested)) {
            // This param isn't documented in the OAS, so we can't know where to put it!
            return;
          }

          if (digested[param].in === 'path') {
            params.path[param] = metadata[param] as string;
          } else if (digested[param].in === 'query') {
            params.query[param] = metadata[param] as string;
          } else if (digested[param].in === 'header') {
            params.header[param] = metadata[param] as string;
          } else if (digested[param].in === 'cookie') {
            params.cookie[param] = metadata[param] as string;
          }

          // Because a user might have sent just a metadata object, we want to make sure that we
          // filter out anything that they sent that is a parameter from also being sent as part
          // of a form data payload for `x-www-form-urlencoded` requests.
          if (metadataIntersected && operation.isFormUrlEncoded()) {
            if (param in params.formData) {
              delete params.formData[param];
            }
          }
        });
      }
    }
  }

  // Clean up any empty items.
  ['body', 'cookie', 'files', 'formData', 'header', 'path', 'query'].forEach((type: keyof typeof params) => {
    if (type in params && isEmpty(params[type])) {
      delete params[type];
    }
  });

  return params;
}
