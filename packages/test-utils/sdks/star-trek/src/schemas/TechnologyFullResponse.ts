import TechnologyFull from './TechnologyFull.js';

const TechnologyFullResponse = {
  "type": "object",
  "description": "Response object for single technology query",
  "properties": {
    "technology": TechnologyFull
  },
  "title": "TechnologyFullResponse",
  "x-readme-ref-name": "TechnologyFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TechnologyFullResponse
