const Tag = {
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "title": "Tag",
  "x-readme-ref-name": "Tag"
} as const;
export default Tag
