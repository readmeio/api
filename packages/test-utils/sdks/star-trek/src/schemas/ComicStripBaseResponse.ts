import ComicStripBase from './ComicStripBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

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
