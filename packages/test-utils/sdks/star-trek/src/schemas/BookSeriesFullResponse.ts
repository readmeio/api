import BookSeriesFull from './BookSeriesFull.js';

const BookSeriesFullResponse = {
  "type": "object",
  "description": "Response object for single book series query",
  "properties": {
    "bookSeries": BookSeriesFull
  },
  "title": "BookSeriesFullResponse",
  "x-readme-ref-name": "BookSeriesFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default BookSeriesFullResponse
