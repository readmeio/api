const SeriesHeader = {
  "type": "object",
  "description": "Header series, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Series unique ID"
    },
    "title": {
      "type": "string",
      "description": "Series title"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "SeriesHeader",
  "x-readme-ref-name": "SeriesHeader"
} as const;
export default SeriesHeader
