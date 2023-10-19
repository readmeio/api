import AnimalBase from './AnimalBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

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
  "x-readme-ref-name": "AnimalBaseResponse"
} as const;
export default AnimalBaseResponse
