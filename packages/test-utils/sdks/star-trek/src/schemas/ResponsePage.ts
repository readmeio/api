const ResponsePage = {
  "type": "object",
  "description": "Object describing response page",
  "properties": {
    "pageNumber": {
      "type": "integer",
      "description": "Zero-based page number",
      "format": "int32"
    },
    "pageSize": {
      "type": "integer",
      "description": "Page size",
      "format": "int32"
    },
    "numberOfElements": {
      "type": "integer",
      "description": "Number of elements in page",
      "format": "int32"
    },
    "totalElements": {
      "type": "integer",
      "description": "Total elements found",
      "format": "int32"
    },
    "totalPages": {
      "type": "integer",
      "description": "Total pages found",
      "format": "int32"
    },
    "firstPage": {
      "type": "boolean",
      "description": "Whether it is the first page"
    },
    "lastPage": {
      "type": "boolean",
      "description": "Whether it is the last page"
    }
  },
  "title": "ResponsePage",
  "x-readme-ref-name": "ResponsePage"
} as const;
export default ResponsePage
