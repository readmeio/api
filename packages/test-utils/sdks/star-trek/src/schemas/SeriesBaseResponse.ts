import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import SeriesBase from './SeriesBase.js';

const SeriesBaseResponse = {
  "type": "object",
  "description": "Response object for series search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "series": {
      "type": "array",
      "description": "List of series matching given criteria",
      "items": SeriesBase
    }
  },
  "title": "SeriesBaseResponse",
  "x-readme-ref-name": "SeriesBaseResponse"
} as const;
export default SeriesBaseResponse
