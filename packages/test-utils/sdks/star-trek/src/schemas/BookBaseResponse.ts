import BookBase from './BookBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const BookBaseResponse = {
  "type": "object",
  "description": "Response object for books search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "books": {
      "type": "array",
      "description": "List of books matching given criteria",
      "items": BookBase
    }
  },
  "title": "BookBaseResponse",
  "x-readme-ref-name": "BookBaseResponse"
} as const;
export default BookBaseResponse
