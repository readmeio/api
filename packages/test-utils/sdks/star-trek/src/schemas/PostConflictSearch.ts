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
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of the conflict",
        "format": "int32"
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
export default PostConflictSearch
