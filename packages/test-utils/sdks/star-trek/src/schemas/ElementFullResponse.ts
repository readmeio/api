import ElementFull from './ElementFull';

const ElementFullResponse = {
  "type": "object",
  "description": "Response object for single element query",
  "properties": {
    "element": ElementFull
  },
  "title": "ElementFullResponse",
  "x-readme-ref-name": "ElementFullResponse"
} as const;
export default ElementFullResponse
