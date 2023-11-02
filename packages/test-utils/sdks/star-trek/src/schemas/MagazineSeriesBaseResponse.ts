import MagazineSeriesBase from './MagazineSeriesBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const MagazineSeriesBaseResponse = {
  "type": "object",
  "description": "Response object for magazine series search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "magazineSeries": {
      "type": "array",
      "description": "List of magazine series matching given criteria",
      "items": MagazineSeriesBase
    }
  },
  "title": "MagazineSeriesBaseResponse",
  "x-readme-ref-name": "MagazineSeriesBaseResponse"
} as const;
export default MagazineSeriesBaseResponse
