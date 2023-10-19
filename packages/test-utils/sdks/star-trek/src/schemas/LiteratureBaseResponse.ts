import LiteratureBase from './LiteratureBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const LiteratureBaseResponse = {
  "type": "object",
  "description": "Response object for literature search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "literature": {
      "type": "array",
      "description": "List of literature matching given criteria",
      "items": LiteratureBase
    }
  },
  "title": "LiteratureBaseResponse",
  "x-readme-ref-name": "LiteratureBaseResponse"
} as const;
export default LiteratureBaseResponse
