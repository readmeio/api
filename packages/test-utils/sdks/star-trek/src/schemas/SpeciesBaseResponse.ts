import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import SpeciesBase from './SpeciesBase';

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
