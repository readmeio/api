const PostMagazineSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Magazine title"
      },
      "publishedYearFrom": {
        "type": "integer",
        "description": "Starting year the magazine was published",
        "format": "int32"
      },
      "publishedYearTo": {
        "type": "integer",
        "description": "Ending year the magazine was published",
        "format": "int32"
      },
      "numberOfPagesFrom": {
        "type": "integer",
        "description": "Minimal number of pages",
        "format": "int32"
      },
      "numberOfPagesTo": {
        "type": "integer",
        "description": "Maximal number of pages",
        "format": "int32"
      }
    },
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Page size"
          },
          "sort": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Sorting, serialized like this: fieldName,ASC;anotherFieldName,DESC"
          },
          "apiKey": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "API key"
          }
        },
        "required": []
      }
    ]
  }
} as const;
export default PostMagazineSearch
