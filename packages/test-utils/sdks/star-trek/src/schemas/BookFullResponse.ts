import BookFull from './BookFull';

const BookFullResponse = {
  "type": "object",
  "description": "Response object for single book query",
  "properties": {
    "book": BookFull
  },
  "title": "BookFullResponse",
  "x-readme-ref-name": "BookFullResponse"
} as const;
export default BookFullResponse
