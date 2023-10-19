import SpacecraftClassFull from './SpacecraftClassFull';

const SpacecraftClassFullResponse = {
  "type": "object",
  "description": "Response object for single spacecraft class query",
  "properties": {
    "spacecraftClass": SpacecraftClassFull
  },
  "title": "SpacecraftClassFullResponse",
  "x-readme-ref-name": "SpacecraftClassFullResponse"
} as const;
export default SpacecraftClassFullResponse
