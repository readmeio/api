import type { Operation } from 'oas';
import type { ParameterObject, SchemaObject } from 'oas/dist/rmoas.types';
import type { ReadStream } from 'fs';

import lodashMerge from 'lodash.merge';
import fs from 'fs/promises';
import path from 'path';
import stream from 'stream';
import getStream from 'get-stream';
import datauri from 'datauri/sync';
import DatauriParser from 'datauri/parser';
import getJSONSchemaDefaults from './getJSONSchemaDefaults';

/**
 * Extract all available parameters from an operations Parameter Object into a digestable array
 * that we can use to apply to the request.
 *
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject}
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject}
 * @param parameters
 */
function digestParameters(parameters: ParameterObject[]): Record<string, ParameterObject> {
  return parameters.reduce((prev, param) => {
    if ('$ref' in param || 'allOf' in param || 'anyOf' in param || 'oneOf' in param) {
      throw new Error("The OpenAPI document for this operation wasn't dereferenced before processing.");
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

function isObject(thing: any) {
  if (thing instanceof stream.Readable) {
    return false;
  }

  return typeof thing === 'object' && thing !== null && !Array.isArray(thing);
}

function isPrimitive(obj: any) {
  return typeof obj === null || typeof obj === 'number' || typeof obj === 'string';
}

function merge(src: any, target: any) {
  if (Array.isArray(target)) {
    // @todo we need to add support for merging array defaults with array body/metadata arguments
    return target;
  } else if (!isObject(target)) {
    return target;
  }

  return lodashMerge(src, target);
}

/**
 * Ingest a file path or readable stream into a common object that we can later use to process it
 * into a parameters object for making an API request.
 *
 * @param paramName
 * @param file
 */
function processFile(
  paramName: string,
  file: string | ReadStream
): Promise<{ paramName: string; base64: string; filename: string; buffer: Buffer }> {
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

  return Promise.reject(
    new TypeError(
      paramName
        ? `The data supplied for the \`${paramName}\` request body parameter is not a file handler that we support.`
        : 'The data supplied for the request body payload is not a file handler that we support.'
    )
  );
}

/**
 * With potentially supplied body and/or metadata we need to run through them against a given API
 * operation to see what's what and prepare any available parameters to be used in an API request
 * with `@readme/oas-to-har`.
 *
 * @param operation
 * @param body
 * @param metadata
 */
export default async function prepareParams(operation: Operation, body?: unknown, metadata?: Record<string, unknown>) {
  let metadataIntersected = false;
  const digestedParameters = digestParameters(operation.getParameters());
  const hasDigestedParams = !!Object.keys(digestedParameters).length;
  const jsonSchema = operation.getParametersAsJsonSchema();

  if (!jsonSchema && (body !== undefined || metadata !== undefined)) {
    throw new Error(
      "You supplied metadata and/or body data for this operation but it doesn't have any documented parameters or request payloads. If you think this is an error please contact support for the API you're using."
    );
  }

  const jsonSchemaDefaults = jsonSchema ? getJSONSchemaDefaults(jsonSchema) : {};

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
  } = jsonSchemaDefaults;

  // If a body argument was supplied we need to do a bit of work to see if it's actually a body
  // argument or metadata because the library lets you supply either a body, metadata, or body with
  // metadata.
  if (typeof body !== 'undefined') {
    if (Array.isArray(body) || isPrimitive(body)) {
      // If the body param is an array or a primitive then we know it's absolutely a body because
      // metadata can only ever be undefined or an object.
      params.body = merge(params.body, body);
    } else if (typeof metadata === 'undefined') {
      // No metadata was explicitly provided so we need to analyze the body to determine if it's a
      // body or should be actually be treated as metadata.
      if (!hasDigestedParams) {
        // If no parameters were able to be digested it's because this operation has none so then
        // we just have to assume that what the user supplied was for a body and not metadata. This
        // might lead to unwanted false positives if the API definition isn't accurate but short of
        // throwing an error (one that the user would have no control over resolving anyways) there
        // isn't anything we can do about it.
        params.body = merge(params.body, body);
      } else {
        const intersection = Object.keys(body).filter(value => Object.keys(digestedParameters).includes(value)).length;
        if (intersection && intersection / Object.keys(body).length > 0.25) {
          /* eslint-disable no-param-reassign */
          // If more than 25% of the body intersects with the parameters that we've got on hand,
          // then we should treat it as a metadata object and organize into parameters.
          metadataIntersected = true;
          metadata = merge(params.body, body) as Record<string, unknown>;
          body = undefined;
          /* eslint-enable no-param-reassign */
        } else {
          // For all other cases, we should just treat the supplied body as a body.
          params.body = merge(params.body, body);
        }
      }
    } else {
      // Body and metadata were both supplied.
      params.body = merge(params.body, body);
    }
  }

  if (!operation.hasRequestBody()) {
    // If this operation doesn't have any documented request body then we shouldn't be sending
    // anything.
    delete params.body;
  } else {
    if (!('body' in params)) params.body = {};

    // We need to retrieve the request body for this operation to search for any `binary` format
    // data that the user wants to send so we know what we need to prepare for the final API
    // request.
    const payloadJsonSchema = jsonSchema.find(js => js.type === 'body');
    if (payloadJsonSchema) {
      if (!params.files) params.files = {};

      const conversions = [];

      // @todo add support for `type: array`, `oneOf` and `anyOf`
      if (payloadJsonSchema.schema?.properties) {
        Object.entries(payloadJsonSchema.schema?.properties)
          .filter(([, schema]: [string, SchemaObject]) => schema?.format === 'binary')
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

  // Form data should be placed within `formData` instead of `body` for it to properly get picked
  // up by `fetch-har`.
  if (operation.isFormUrlEncoded()) {
    params.formData = merge(params.formData, params.body);
    delete params.body;
  }

  // Only spend time trying to organize metadata into parameters if we were able to digest
  // parameters out of the operation schema. If we couldn't digest anything, but metadata was
  // supplied then we wouldn't know how to send it in the request!
  if (hasDigestedParams) {
    if (!('cookie' in params)) params.cookie = {};
    if (!('header' in params)) params.header = {};
    if (!('path' in params)) params.path = {};
    if (!('query' in params)) params.query = {};

    Object.entries(digestedParameters).forEach(([paramName, param]) => {
      let value: any;
      if (typeof metadata === 'object' && !isEmpty(metadata) && paramName in metadata) {
        value = metadata[paramName];
      }

      if (value === undefined) {
        return;
      }

      /* eslint-disable no-param-reassign */
      switch (param.in) {
        case 'path':
          params.path[paramName] = value;
          delete metadata[paramName];
          break;
        case 'query':
          params.query[paramName] = value;
          delete metadata[paramName];
          break;
        case 'header':
          params.header[paramName] = value;
          delete metadata[paramName];
          break;
        case 'cookie':
          params.cookie[paramName] = value;
          delete metadata[paramName];
          break;
        default: // no-op
      }
      /* eslint-enable no-param-reassign */

      // Because a user might have sent just a metadata object, we want to make sure that we filter
      // out anything that they sent that is a parameter from also being sent as part of a form
      // data payload for `x-www-form-urlencoded` requests.
      if (metadataIntersected && operation.isFormUrlEncoded()) {
        if (paramName in params.formData) {
          delete params.formData[paramName];
        }
      }
    });

    // If there's any leftover metadata that hasn't been moved into form data for this request we
    // need to move it or else it'll get tossed.
    if (!isEmpty(metadata)) {
      if (operation.isFormUrlEncoded()) {
        params.formData = merge(params.formData, metadata);
      } else {
        // Any other remaining unused metadata will be unused because we don't know where to place
        // it in the request.
      }
    }
  }

  ['body', 'cookie', 'files', 'formData', 'header', 'path', 'query'].forEach((type: keyof typeof params) => {
    if (type in params && isEmpty(params[type])) {
      delete params[type];
    }
  });

  return params;
}
