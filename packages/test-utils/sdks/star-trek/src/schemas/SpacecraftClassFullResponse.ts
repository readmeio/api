import SpacecraftClassFull from './SpacecraftClassFull.js';

const SpacecraftClassFullResponse = {
  "type": "object",
  "description": "Response object for single spacecraft class query",
  "properties": {
    "spacecraftClass": SpacecraftClassFull
  },
  "title": "SpacecraftClassFullResponse",
  "x-readme-ref-name": "SpacecraftClassFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default SpacecraftClassFullResponse
