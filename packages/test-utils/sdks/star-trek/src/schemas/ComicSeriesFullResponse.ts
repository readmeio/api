import ComicSeriesFull from './ComicSeriesFull.js';

const ComicSeriesFullResponse = {
  "type": "object",
  "description": "Response object for single comic series query",
  "properties": {
    "comicSeries": ComicSeriesFull
  },
  "title": "ComicSeriesFullResponse",
  "x-readme-ref-name": "ComicSeriesFullResponse"
} as const;
export default ComicSeriesFullResponse
