// These libraries don't have any types so we need to let TS know so we can use them.
declare module 'fetch-har';
declare module '@readme/oas-to-har';

// Because this library uses ES2015+ `#private` syntax that would require us to make this library
// ESM-only we're using a node12 module resolution for this library. Because of this the types
// for `form-data-encoder` don't get automatically pulled in and since there is no standalone
// `@types/form-data-encoder` package we need to declare a module.
//
// This isn't a great solution, and we lose some type checks on it, but it's far too early in the
// ESM lifecycle for us to make API an ESM-only library.
declare module 'form-data-encoder';
