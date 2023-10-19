import ComicSeriesBase from './ComicSeriesBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

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
