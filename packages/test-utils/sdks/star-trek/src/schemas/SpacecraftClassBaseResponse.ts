import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import SpacecraftClassBase from './SpacecraftClassBase.js';

const SpacecraftClassBaseResponse = {
  "type": "object",
  "description": "Response object for spacecraft classes search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "spacecraftClasses": {
      "type": "array",
      "description": "List of spacecraft classes matching given criteria",
      "items": SpacecraftClassBase
    }
  },
  "title": "SpacecraftClassBaseResponse",
  "x-readme-ref-name": "SpacecraftClassBaseResponse"
} as const;
export default SpacecraftClassBaseResponse
