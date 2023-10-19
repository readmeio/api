const Category = {
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "minimum": -9223372036854776000,
      "maximum": 9223372036854776000
    },
    "name": {
      "type": "string"
    }
  },
  "title": "Category",
  "x-readme-ref-name": "Category"
} as const;
export default Category
