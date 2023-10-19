const PostConflictSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Conflict name"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of the conflict",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of the conflict",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "earthConflict": {
        "type": "boolean",
        "description": "Whether it should be an Earth conflict"
      },
      "federationWar": {
        "type": "boolean",
        "description": "Whether this conflict should be a part of war involving Federation"
      },
      "klingonWar": {
        "type": "boolean",
        "description": "Whether this conflict should be a part of war involving the Klingons"
      },
      "dominionWarBattle": {
        "type": "boolean",
        "description": "Whether this conflict should be a Dominion war battle"
      },
      "alternateReality": {
        "type": "boolean",
        "description": "Whether this conflict should be from alternate reality"
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
export default PostConflictSearch
