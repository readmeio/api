import ComicStripBase from './ComicStripBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const ComicStripBaseResponse = {
  "type": "object",
  "description": "Response object for comic strip search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "comicStrips": {
      "type": "array",
      "description": "List of comic strips matching given criteria",
      "items": ComicStripBase
    }
  },
  "title": "ComicStripBaseResponse",
  "x-readme-ref-name": "ComicStripBaseResponse"
} as const;
export default ComicStripBaseResponse
