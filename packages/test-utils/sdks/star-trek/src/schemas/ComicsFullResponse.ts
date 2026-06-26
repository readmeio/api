import ComicsFull from './ComicsFull.js';

const ComicsFullResponse = {
  "type": "object",
  "description": "Response object for single comics query",
  "properties": {
    "comics": ComicsFull
  },
  "title": "ComicsFullResponse",
  "x-readme-ref-name": "ComicsFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ComicsFullResponse
