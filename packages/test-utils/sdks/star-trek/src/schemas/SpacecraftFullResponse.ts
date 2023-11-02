import SpacecraftFull from './SpacecraftFull.js';

const SpacecraftFullResponse = {
  "type": "object",
  "description": "Response object for single spacecraft query",
  "properties": {
    "spacecraft": SpacecraftFull
  },
  "title": "SpacecraftFullResponse",
  "x-readme-ref-name": "SpacecraftFullResponse"
} as const;
export default SpacecraftFullResponse
