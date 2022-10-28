/**
 * Because parts of our OpenAPI dereferencer in `oas` can update variable references passed to it
 * we may need to sometimes fully clone a spec to test something. This is just a small DIY wrapper
 * for doing so.
 */
export default function loadSpec(spec: string) {
  return import(spec).then(({ default: data }) => JSON.stringify(data)).then(JSON.parse);
}
