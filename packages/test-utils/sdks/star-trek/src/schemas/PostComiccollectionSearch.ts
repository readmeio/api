const PostComiccollectionSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Comic collection title"
      },
      "publishedYearFrom": {
        "type": "integer",
        "description": "Starting year the comic collection was published",
        "format": "int32"
      },
      "publishedYearTo": {
        "type": "integer",
        "description": "Ending year the comic collection was published",
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
      },
      "stardateFrom": {
        "type": "number",
        "description": "Starting stardate of comic collection stories",
        "format": "float"
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of comic collections stories",
        "format": "float"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of comic collection stories",
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of comic collections stories",
        "format": "int32"
      },
      "photonovel": {
        "type": "boolean",
        "description": "Whether it should be an photonovel collection"
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
export default PostComiccollectionSearch
