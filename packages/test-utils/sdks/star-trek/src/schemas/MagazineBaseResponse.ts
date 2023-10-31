import MagazineBase from './MagazineBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const MagazineBaseResponse = {
  "type": "object",
  "description": "Response object for magazine search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "magazines": {
      "type": "array",
      "description": "List of magazines matching given criteria",
      "items": MagazineBase
    }
  },
  "title": "MagazineBaseResponse",
  "x-readme-ref-name": "MagazineBaseResponse"
} as const;
export default MagazineBaseResponse
