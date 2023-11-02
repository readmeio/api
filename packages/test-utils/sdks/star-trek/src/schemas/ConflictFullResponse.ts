import ConflictFull from './ConflictFull.js';

const ConflictFullResponse = {
  "type": "object",
  "description": "Response object for single conflict query",
  "properties": {
    "conflict": ConflictFull
  },
  "title": "ConflictFullResponse",
  "x-readme-ref-name": "ConflictFullResponse"
} as const;
export default ConflictFullResponse
