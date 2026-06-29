import MaterialFull from './MaterialFull.js';

const MaterialFullResponse = {
  "type": "object",
  "description": "Response object for single material query",
  "properties": {
    "material": MaterialFull
  },
  "title": "MaterialFullResponse",
  "x-readme-ref-name": "MaterialFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MaterialFullResponse
