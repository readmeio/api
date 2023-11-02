import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import SpacecraftBase from './SpacecraftBase.js';

const SpacecraftBaseResponse = {
  "type": "object",
  "description": "Response object for spacecrafts search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "spacecrafts": {
      "type": "array",
      "description": "List of spacecrafts matching given criteria",
      "items": SpacecraftBase
    }
  },
  "title": "SpacecraftBaseResponse",
  "x-readme-ref-name": "SpacecraftBaseResponse"
} as const;
export default SpacecraftBaseResponse
