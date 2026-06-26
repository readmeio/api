import LiteratureFull from './LiteratureFull.js';

const LiteratureFullResponse = {
  "type": "object",
  "description": "Response object for single literature query",
  "properties": {
    "literature": LiteratureFull
  },
  "title": "LiteratureFullResponse",
  "x-readme-ref-name": "LiteratureFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default LiteratureFullResponse
