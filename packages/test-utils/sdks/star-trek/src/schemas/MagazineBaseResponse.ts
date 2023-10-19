import MagazineBase from './MagazineBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

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
