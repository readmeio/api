const PostSpacecraftSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Spacecraft name"
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
export default PostSpacecraftSearch
