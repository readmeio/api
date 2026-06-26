import BookSeriesBase from './BookSeriesBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const BookSeriesBaseResponse = {
  "type": "object",
  "description": "Response object for book series search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "bookSeries": {
      "type": "array",
      "description": "List of book series matching given criteria",
      "items": BookSeriesBase
    }
  },
  "title": "BookSeriesBaseResponse",
  "x-readme-ref-name": "BookSeriesBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default BookSeriesBaseResponse
