import Category from './Category.js';
import Tag from './Tag.js';

const Pet = {
  "type": "object",
  "required": [
    "name",
    "photoUrls"
  ],
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "readOnly": true,
      "default": 40,
      "examples": [
        25
      ]
    },
    "category": Category,
    "name": {
      "type": "string",
      "examples": [
        "doggie"
      ]
    },
    "photoUrls": {
      "type": "array",
      "items": {
        "type": "string",
        "examples": [
          "https://example.com/photo.png"
        ]
      }
    },
    "tags": {
      "type": "array",
      "items": Tag
    },
    "status": {
      "type": "string",
      "description": "pet status in the store",
      "enum": [
        "available",
        "pending",
        "sold"
      ]
    }
  },
  "title": "Pet",
  "x-readme-ref-name": "Pet"
} as const;
export default Pet
