import ConflictBase from './ConflictBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

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
  "x-readme-ref-name": "ConflictBaseResponse"
} as const;
export default ConflictBaseResponse
