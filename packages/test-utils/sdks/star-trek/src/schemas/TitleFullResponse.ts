import TitleFull from './TitleFull.js';

const TitleFullResponse = {
  "type": "object",
  "description": "Response object for single title query",
  "properties": {
    "title": TitleFull
  },
  "title": "TitleFullResponse",
  "x-readme-ref-name": "TitleFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TitleFullResponse
