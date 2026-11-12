import type { SchemaObject, SchemaWrapper } from 'oas/types';

import traverse from 'json-schema-traverse';

/**
 * Run through a JSON Schema object and compose up an object containing default data for any schema
 * property that is required and also has a defined default.
 *
 * Code partially adapted from the `json-schema-default` package but modified to only return
 * defaults of required properties.
 *
 * @todo This is a good candidate to be moved into a core `oas` library method.
 * @see {@link https://github.com/mdornseif/json-schema-default}
 */
export default function getJSONSchemaDefaults(jsonSchemas: SchemaWrapper[]) {
  return jsonSchemas
    .map(({ type: payloadType, schema: jsonSchema }) => {
      const defaults: Record<string, unknown> = {};
      traverse(
        jsonSchema,
        (
          schema: SchemaObject,
          pointer: string,
          rootSchema: SchemaObject,
          parentPointer?: string,
          parentKeyword?: string,
          parentSchema?: SchemaObject,
          indexProperty?: number | string,
        ) => {
          if (!pointer.startsWith('/properties/')) {
            return;
          }

          if (Array.isArray(parentSchema?.required) && parentSchema?.required.includes(String(indexProperty))) {
            // Find this property's parent object in `defaults`. The traversal visits a parent before its
            // children, so a required parent object has already been seeded. When a parent is missing (it is
            // optional, or sits inside an array) there is nowhere to put the value, so leave it out rather than
            // writing it at the root of the payload.
            let destination: Record<string, unknown> | undefined = defaults;
            if (parentPointer) {
              // To map nested objects correct we need to pick apart the parent pointer.
              parentPointer
                .replace(/\/properties/g, '')
                .split('/')
                .forEach((subSchema: string) => {
                  if (subSchema === '' || destination === undefined) {
                    return;
                  }

                  const next = destination[subSchema];
                  destination =
                    next && typeof next === 'object' && !Array.isArray(next)
                      ? (next as Record<string, unknown>)
                      : undefined;
                });
            }

            if (destination === undefined || indexProperty === undefined) {
              return;
            }

            if (schema.type === 'object' && indexProperty && destination[indexProperty] === undefined) {
              destination[indexProperty] = {};
            }

            if (schema.default !== undefined) {
              destination[indexProperty] = schema.default;
            }
          }
        },
      );

      if (!Object.keys(defaults).length) {
        return {};
      }

      return {
        // @todo should we filter out empty and undefined objects from here with `remove-undefined-objects`?
        [payloadType]: defaults,
      };
    })
    .reduce((prev, next) => Object.assign(prev, next));
}
