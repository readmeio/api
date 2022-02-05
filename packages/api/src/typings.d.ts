// These libraries don't have any types so we need to let TS know so we can use them.
declare module 'fetch-har';
declare module '@readme/oas-to-har';

// We should eventually merge this in with the `OASDocument` type that `oas` provides, or use
// the `openapi-types` library, but both of those currently have a lot of issues with seemingly
// valid specs busting types because of problems in `openapi-types`.
//
// For example with the `@readme/oas-examples/3.0/json/security.json` definition it thinks that
// the `apiKey_cookie` security scheme isn't a valid apiKey security scheme despite it absolutely
// being valid. Or with `@readme/oas-examples/3.0/json/petstore.json` it thinks that the `Order`
// component isn't valid at all.
type OASDocument = Record<string, unknown>;
