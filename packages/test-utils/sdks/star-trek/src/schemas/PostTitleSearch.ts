const PostTitleSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Title name"
      },
      "militaryRank": {
        "type": "boolean",
        "description": "Whether it should be a military rank"
      },
      "fleetRank": {
        "type": "boolean",
        "description": "Whether it should be a fleet rank"
      },
      "religiousTitle": {
        "type": "boolean",
        "description": "Whether it should be a religious title"
      },
      "position": {
        "type": "boolean",
        "description": "Whether it should be a position"
      },
      "mirror": {
        "type": "boolean",
        "description": "Whether this title should be from mirror universe"
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
export default PostTitleSearch
