const PostLiteratureSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Literature title"
      },
      "earthlyOrigin": {
        "type": "boolean",
        "description": "Whether it should be of earthly origin"
      },
      "shakespeareanWork": {
        "type": "boolean",
        "description": "Whether it should be a Shakespearean work"
      },
      "report": {
        "type": "boolean",
        "description": "Whether it should be a report"
      },
      "scientificLiterature": {
        "type": "boolean",
        "description": "Whether it should be a scientific literature"
      },
      "technicalManual": {
        "type": "boolean",
        "description": "Whether it should be a technical manual"
      },
      "religiousLiterature": {
        "type": "boolean",
        "description": "Whether it should be a religious literature"
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
export default PostLiteratureSearch
