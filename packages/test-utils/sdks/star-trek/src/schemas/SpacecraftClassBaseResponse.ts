import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import SpacecraftClassBase from './SpacecraftClassBase';

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
