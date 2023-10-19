import BookSeriesFull from './BookSeriesFull';

const BookSeriesFullResponse = {
  "type": "object",
  "description": "Response object for single book series query",
  "properties": {
    "bookSeries": BookSeriesFull
  },
  "title": "BookSeriesFullResponse",
  "x-readme-ref-name": "BookSeriesFullResponse"
} as const;
export default BookSeriesFullResponse
