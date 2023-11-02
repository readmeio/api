import ElementBase from './ElementBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const ElementBaseResponse = {
  "type": "object",
  "description": "Response object for elements search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "elements": {
      "type": "array",
      "description": "List of elements matching given criteria",
      "items": ElementBase
    }
  },
  "title": "ElementBaseResponse",
  "x-readme-ref-name": "ElementBaseResponse"
} as const;
export default ElementBaseResponse
