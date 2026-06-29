import PerformerFull from './PerformerFull.js';

const PerformerFullResponse = {
  "type": "object",
  "description": "Response object for single performer query",
  "properties": {
    "performer": PerformerFull
  },
  "title": "PerformerFullResponse",
  "x-readme-ref-name": "PerformerFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default PerformerFullResponse
