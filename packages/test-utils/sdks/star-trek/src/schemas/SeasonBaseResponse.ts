import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import SeasonBase from './SeasonBase.js';

const SeasonBaseResponse = {
  "type": "object",
  "description": "Response object for seasons search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "seasons": {
      "type": "array",
      "description": "List of seasons matching given criteria",
      "items": SeasonBase
    }
  },
  "title": "SeasonBaseResponse",
  "x-readme-ref-name": "SeasonBaseResponse"
} as const;
export default SeasonBaseResponse
