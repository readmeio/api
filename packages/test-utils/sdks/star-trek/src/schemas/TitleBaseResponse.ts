import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import TitleBase from './TitleBase.js';

const TitleBaseResponse = {
  "type": "object",
  "description": "Response object for titles search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "titles": {
      "type": "array",
      "description": "List of titles matching given criteria",
      "items": TitleBase
    }
  },
  "title": "TitleBaseResponse",
  "x-readme-ref-name": "TitleBaseResponse"
} as const;
export default TitleBaseResponse
