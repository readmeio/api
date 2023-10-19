import ReferenceType from './ReferenceType';

const Reference = {
  "type": "object",
  "description": "Reference of book, comics, video release, etc.",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Reference unique ID"
    },
    "referenceType": ReferenceType,
    "referenceNumber": {
      "type": "string",
      "description": "Reference number"
    }
  },
  "title": "Reference",
  "x-readme-ref-name": "Reference"
} as const;
export default Reference
