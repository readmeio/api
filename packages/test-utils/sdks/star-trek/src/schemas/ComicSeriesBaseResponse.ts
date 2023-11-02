import ComicSeriesBase from './ComicSeriesBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const ComicSeriesBaseResponse = {
  "type": "object",
  "description": "Response object for comic series search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "comicSeries": {
      "type": "array",
      "description": "List of comic series matching given criteria",
      "items": ComicSeriesBase
    }
  },
  "title": "ComicSeriesBaseResponse",
  "x-readme-ref-name": "ComicSeriesBaseResponse"
} as const;
export default ComicSeriesBaseResponse
