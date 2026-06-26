import BookCollectionBase from './BookCollectionBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const BookCollectionBaseResponse = {
  "type": "object",
  "description": "Response object for book collections search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "bookCollections": {
      "type": "array",
      "description": "List of book collections matching given criteria",
      "items": BookCollectionBase
    }
  },
  "title": "BookCollectionBaseResponse",
  "x-readme-ref-name": "BookCollectionBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default BookCollectionBaseResponse
