import type { OASDocument, SchemaObject } from 'oas/types';

import OASNormalize from 'oas-normalize';

export async function dereferenceAPI(json: OASDocument) {
  // This may result in some data loss if there's already a `title` present, but in the case
  // where we want to generate code for the API definition (see http://npm.im/api), we'd
  // prefer to retain original reference name as a title for any generated types.
  //
  // This work used to exist within the `oas` library as a `preserveRefAsJSONSchemaTitle`
  // option but was deprecated and removed in https://github.com/readmeio/oas/pull/1084.
  if (json?.components?.schemas && typeof json.components?.schemas === 'object') {
    Object.keys(json.components.schemas).forEach(schemaName => {
      // oxlint-disable-next-line no-param-reassign, no-unsafe-optional-chaining
      (json.components?.schemas?.[schemaName] as SchemaObject).title = schemaName;

      // oxlint-disable-next-line no-param-reassign, no-unsafe-optional-chaining
      (json.components?.schemas?.[schemaName] as SchemaObject)['x-readme-ref-name'] = schemaName;
    });
  }

  const normalize = new OASNormalize(json, {
    parser: {
      dereference: {
        circular: 'ignore',
      },
    },
  });

  return normalize.dereference().then(def => def as OASDocument);
}

export * from './nock-mocks.js';
