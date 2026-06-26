import AnimalBase from './AnimalBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const AnimalBaseResponse = {
  "type": "object",
  "description": "Response object for animals search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "animals": {
      "type": "array",
      "description": "List of animals matching given criteria",
      "items": AnimalBase
    }
  },
  "title": "AnimalBaseResponse",
  "x-readme-ref-name": "AnimalBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AnimalBaseResponse
