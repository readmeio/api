import ComicStripFull from './ComicStripFull.js';

const ComicStripFullResponse = {
  "type": "object",
  "description": "Response object for single comic strip query",
  "properties": {
    "comicStrip": ComicStripFull
  },
  "title": "ComicStripFullResponse",
  "x-readme-ref-name": "ComicStripFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ComicStripFullResponse
