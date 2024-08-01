const PostOccupationSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Occupation name"
      },
      "legalOccupation": {
        "type": "boolean",
        "description": "Whether it should be a legal occupation"
      },
      "medicalOccupation": {
        "type": "boolean",
        "description": "Whether it should be a medical occupation"
      },
      "scientificOccupation": {
        "type": "boolean",
        "description": "Whether it should be a scientific occupation"
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
export default PostOccupationSearch
