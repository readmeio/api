const Category = {
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
  "title": "Category",
  "x-readme-ref-name": "Category"
} as const;
export default Category
