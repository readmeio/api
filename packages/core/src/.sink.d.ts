// Because this library uses ES2015+ `#private` syntax that would require us to maket his
// library ESM-only we're overloading its types with a `paths` config with this empty file.
// This isn't a great solution as we're losing type checks where this library is used, but
// it's far too early in the ESM lifecycle for us to make API an ESM-only library.
//
// And though TS offers an unstable `node12` module resolution that lets us manage this in
// another way that module resolution requires TS nightlies to be installed, which no thanks!
//
// https://github.com/microsoft/TypeScript/issues/17042
declare module 'form-data-encoder';
