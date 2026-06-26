import ConflictBase from './ConflictBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const ConflictBaseResponse = {
  "type": "object",
  "description": "Response object for conflicts search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "conflicts": {
      "type": "array",
      "description": "List of conflicts matching given criteria",
      "items": ConflictBase
    }
  },
  "title": "ConflictBaseResponse",
  "x-readme-ref-name": "ConflictBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ConflictBaseResponse
