import AstronomicalObjectBase from './AstronomicalObjectBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const AstronomicalObjectBaseResponse = {
  "type": "object",
  "description": "Response object for astronomical objects search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "astronomicalObjects": {
      "type": "array",
      "description": "List of astronomical objects matching given criteria",
      "items": AstronomicalObjectBase
    }
  },
  "title": "AstronomicalObjectBaseResponse",
  "x-readme-ref-name": "AstronomicalObjectBaseResponse"
} as const;
export default AstronomicalObjectBaseResponse
