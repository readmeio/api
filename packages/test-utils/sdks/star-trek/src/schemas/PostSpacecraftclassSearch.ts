const PostSpacecraftclassSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Spacecraft class name"
      },
      "warpCapableSpecies": {
        "type": "boolean",
        "description": "Whether it should be a warp-capable spacecraft class"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether this spacecraft class should be from alternate reality"
      }
    },
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "description": "Page size"
          },
          "sort": {
            "type": "string",
            "description": "Sorting, serialized like this: fieldName,ASC;anotherFieldName,DESC"
          },
          "apiKey": {
            "type": "string",
            "description": "API key"
          }
        }
      }
    ]
  }
} as const;
export default PostSpacecraftclassSearch
