import BookCollectionFull from './BookCollectionFull.js';

const BookCollectionFullResponse = {
  "type": "object",
  "description": "Response object for single book collection query",
  "properties": {
    "bookCollection": BookCollectionFull
  },
  "title": "BookCollectionFullResponse",
  "x-readme-ref-name": "BookCollectionFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default BookCollectionFullResponse
