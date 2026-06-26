import ElementFull from './ElementFull.js';

const ElementFullResponse = {
  "type": "object",
  "description": "Response object for single element query",
  "properties": {
    "element": ElementFull
  },
  "title": "ElementFullResponse",
  "x-readme-ref-name": "ElementFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ElementFullResponse
