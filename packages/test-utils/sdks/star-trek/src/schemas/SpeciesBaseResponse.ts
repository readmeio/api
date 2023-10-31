import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import SpeciesBase from './SpeciesBase.js';

const SpeciesBaseResponse = {
  "type": "object",
  "description": "Response object for species search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "species": {
      "type": "array",
      "description": "List of species matching given criteria",
      "items": SpeciesBase
    }
  },
  "title": "SpeciesBaseResponse",
  "x-readme-ref-name": "SpeciesBaseResponse"
} as const;
export default SpeciesBaseResponse
