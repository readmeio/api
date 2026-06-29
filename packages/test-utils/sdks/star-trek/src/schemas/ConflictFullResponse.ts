import ConflictFull from './ConflictFull.js';

const ConflictFullResponse = {
  "type": "object",
  "description": "Response object for single conflict query",
  "properties": {
    "conflict": ConflictFull
  },
  "title": "ConflictFullResponse",
  "x-readme-ref-name": "ConflictFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ConflictFullResponse
