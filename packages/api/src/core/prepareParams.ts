import type { ReadStream } from 'fs';
import type { Operation } from 'oas';
import type { ParameterObject, SchemaObject } from 'oas/dist/rmoas.types';

import fs from 'fs';
import path from 'path';
import stream from 'stream';

import caseless from 'caseless';
import DatauriParser from 'datauri/parser';
import datauri from 'datauri/sync';
import getStream from 'get-stream';
import lodashMerge from 'lodash/merge';
import removeUndefinedObjects from 'remove-undefined-objects';

import getJSONSchemaDefaults from './getJSONSchemaDefaults';

// These headers are normally only defined by the OpenAPI definition but we allow the user to
// manually supply them in their `metadata` parameter if they wish.
const specialHeaders = ['accept', 'authorization'];

/**
 * Extract all available parameters from an operations Parameter Object into a digestable array
 * that we can use to apply to the request.
 *
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject}
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject}
 */
function digestParameters(parameters: ParameterObject[]): Record<string, ParameterObject> {
  return parameters.reduce((prev, param) => {
    if ('$ref' in param || 'allOf' in param || 'anyOf' in param || 'oneOf' in param) {
      throw new Error("The OpenAPI document for this operation wasn't dereferenced before processing.");
    } else if (param.name in prev) {
      throw new Error(
        `The operation you are using has the same parameter, ${param.name}, spread across multiple entry points. We unfortunately can't handle this right now.`,
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
  return obj === null || typeof obj === 'number' || typeof obj === 'string';
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
 */
function processFile(
  paramName: string,
  file: string | ReadStream,
): Promise<{ base64: string; buffer: Buffer; filename: string; paramName: string }> {
  if (typeof file === 'string') {
    // In order to support relative pathed files, we need to attempt to resolve them.
    const resolvedFile = path.resolve(file);

    return new Promise((resolve, reject) => {
      fs.stat(resolvedFile, async err => {
        if (err) {
          if (err.code === 'ENOENT') {
            // It's less than ideal for us to handle files that don't exist like this but because
            // `file` is a string it might actually be the full text contents of the file and not
            // actually a path.
            //
            // We also can't really regex to see if `file` *looks*` like a path because one should be
            // able to pass in a relative `owlbert.png` (instead of `./owlbert.png`) and though that
            // doesn't *look* like a path, it is one that should still work.
            return resolve(undefined);
          }

          return reject(err);
        }

        const fileMetadata = await datauri(resolvedFile);
        const payloadFilename = encodeURIComponent(path.basename(resolvedFile));

        return resolve({
          paramName,
          base64: fileMetadata.content.replace(';base64', `;name=${payloadFilename};base64`),
          filename: payloadFilename,
          buffer: fileMetadata.buffer,
        });
      });
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
        : 'The data supplied for the request body payload is not a file handler that we support.',
    ),
  );
}

/**
 * With potentially supplied body and/or metadata we need to run through them against a given API
 * operation to see what's what and prepare any available parameters to be used in an API request
 * with `@readme/oas-to-har`.
 *
 */
export default async function prepareParams(operation: Operation, body?: unknown, metadata?: Record<string, unknown>) {
  let metadataIntersected = false;
  const digestedParameters = digestParameters(operation.getParameters());
  const jsonSchema = operation.getParametersAsJSONSchema();

  /**
   * It might be common for somebody to run `sdk.findPetsByStatus({ status: 'available' }, {})`, in
   * which case we want to filter out the second (metadata) parameter and treat the first parameter
   * as the metadata instead. If we don't do this, their supplied `status` metadata will be treated
   * as a body parameter, and because there's no `status` body parameter, and no supplied metadata
   * (because it's an empty object), the request won't send a payload.
   *
   * @see {@link https://github.com/readmeio/api/issues/449}
   */
  // eslint-disable-next-line no-param-reassign
  metadata = removeUndefinedObjects(metadata);

  if (!jsonSchema && (body !== undefined || metadata !== undefined)) {
    let throwNoParamsError = true;

    // If this operation doesn't have any parameters for us to transform to JSON Schema but they've
    // sent us either an `Accept` or `Authorization` header (or both) we should let them do that.
    // We should, however, only do this check for the `body` parameter as if they've sent this
    // request both `body` and `metadata` we can reject it outright as the operation won't have any
    // body data.
    if (body !== undefined) {
      if (typeof body === 'object' && body !== null && !Array.isArray(body)) {
        if (Object.keys(body).length <= 2) {
          const bodyParams = caseless(body);

          if (specialHeaders.some(header => bodyParams.has(header))) {
            throwNoParamsError = false;
          }
        }
      }
    }

    if (throwNoParamsError) {
      throw new Error(
        "You supplied metadata and/or body data for this operation but it doesn't have any documented parameters or request payloads. If you think this is an error please contact support for the API you're using.",
      );
    }
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
      const headerParams = caseless({});
      Object.entries(digestedParameters).forEach(([paramName, param]) => {
        // Headers are sent case-insensitive so we need to make sure that we're properly
        // matching them when detecting what our incoming payload looks like.
        if (param.in === 'header') {
          headerParams.set(paramName, '');
        }
      });

      // `Accept` and `Authorization` headers can't be defined as normal parameters but we should
      // always allow the user to supply them if they wish.
      specialHeaders.forEach(header => {
        if (!headerParams.has(header)) {
          headerParams.set(header, '');
        }
      });

      const intersection = Object.keys(body).filter(value => {
        if (Object.keys(digestedParameters).includes(value)) {
          return true;
        } else if (headerParams.has(value)) {
          return true;
        }

        return false;
      }).length;

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
  if (typeof metadata !== 'undefined') {
    if (!('cookie' in params)) params.cookie = {};
    if (!('header' in params)) params.header = {};
    if (!('path' in params)) params.path = {};
    if (!('query' in params)) params.query = {};

    Object.entries(digestedParameters).forEach(([paramName, param]) => {
      let value: any;
      let metadataHeaderParam;
      if (typeof metadata === 'object' && !isEmpty(metadata)) {
        if (paramName in metadata) {
          value = metadata[paramName];
          metadataHeaderParam = paramName;
        } else if (param.in === 'header') {
          // Headers are sent case-insensitive so we need to make sure that we're properly
          // matching them when detecting what our incoming payload looks like.
          metadataHeaderParam = Object.keys(metadata).find(k => k.toLowerCase() === paramName.toLowerCase());
          value = metadata[metadataHeaderParam];
        }
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
          params.header[paramName.toLowerCase()] = value;
          delete metadata[metadataHeaderParam];
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
      if (typeof metadata === 'object') {
        // If the user supplied an `accept` or `authorization` header themselves we should allow it
        // through. Normally these headers are automatically handled by `@readme/oas-to-har` but in
        // the event that maybe the user wants to return XML for an API that normally returns JSON
        // or specify a custom auth header (maybe we can't handle their auth case right) this is the
        // only way with this library that they can do that.
        specialHeaders.forEach(headerName => {
          const headerParam = Object.keys(metadata).find(m => m.toLowerCase() === headerName);
          if (headerParam) {
            params.header[headerName] = metadata[headerParam] as string;
            // eslint-disable-next-line no-param-reassign
            delete metadata[headerParam];
          }
        });
      }

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
