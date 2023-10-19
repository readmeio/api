const PostSeasonSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Season title"
      },
      "seasonNumberFrom": {
        "type": "integer",
        "description": "Minimal season number",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "seasonNumberTo": {
        "type": "integer",
        "description": "Maximal season number",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "numberOfEpisodesFrom": {
        "type": "integer",
        "description": "Minimal number of episodes in season",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "numberOfEpisodesTo": {
        "type": "integer",
        "description": "Maximal number of episodes in season",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
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
            "minimum": -2147483648,
            "maximum": 2147483647,
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647,
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
export default PostSeasonSearch
