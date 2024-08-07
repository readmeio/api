const PostSoundtrackSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Soundtrack title"
      },
      "releaseDateFrom": {
        "type": "string",
        "description": "Minimal release date",
        "format": "date"
      },
      "releaseDateTo": {
        "type": "string",
        "description": "Maximal release date",
        "format": "date"
      },
      "lengthFrom": {
        "type": "integer",
        "description": "Minimal length, in seconds",
        "format": "int32"
      },
      "lengthTo": {
        "type": "integer",
        "description": "Maximal length, in seconds",
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
export default PostSoundtrackSearch
