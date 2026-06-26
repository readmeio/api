import ComicCollectionFull from './ComicCollectionFull.js';

const ComicCollectionFullResponse = {
  "type": "object",
  "description": "Response object for single comic collection query",
  "properties": {
    "comicCollection": ComicCollectionFull
  },
  "title": "ComicCollectionFullResponse",
  "x-readme-ref-name": "ComicCollectionFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ComicCollectionFullResponse
