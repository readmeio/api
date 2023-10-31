import PerformerBase from './PerformerBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const PerformerBaseResponse = {
  "type": "object",
  "description": "Response object for performers search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "performers": {
      "type": "array",
      "description": "List of performers matching given criteria",
      "items": PerformerBase
    }
  },
  "title": "PerformerBaseResponse",
  "x-readme-ref-name": "PerformerBaseResponse"
} as const;
export default PerformerBaseResponse
