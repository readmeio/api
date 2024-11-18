const PostCharacterSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Character name"
      },
      "gender": {
        "type": "string",
        "description": "Character gender"
      },
      "deceased": {
        "type": "boolean",
        "description": "Whether it should be a deceased character"
      },
      "hologram": {
        "type": "boolean",
        "description": "Whether it should be a hologram"
      },
      "fictionalCharacter": {
        "type": "boolean",
        "description": "Whether it should be a fictional character (from universe point of view)"
      },
      "mirror": {
        "type": "boolean",
        "description": "Whether it should be a mirror universe character"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether it should be a alternate reality character"
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
export default PostCharacterSearch
