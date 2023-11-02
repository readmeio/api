import OccupationBase from './OccupationBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const OccupationBaseResponse = {
  "type": "object",
  "description": "Response object for occupations search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "occupations": {
      "type": "array",
      "description": "List of occupations matching given criteria",
      "items": OccupationBase
    }
  },
  "title": "OccupationBaseResponse",
  "x-readme-ref-name": "OccupationBaseResponse"
} as const;
export default OccupationBaseResponse
