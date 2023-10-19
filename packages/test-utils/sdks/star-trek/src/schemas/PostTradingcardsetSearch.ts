const PostTradingcardsetSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Trading card set name"
      },
      "releaseYearFrom": {
        "type": "integer",
        "description": "Starting year the trading card set was released",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "releaseYearTo": {
        "type": "integer",
        "description": "Ending year the trading card set was released",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "cardsPerPackFrom": {
        "type": "integer",
        "description": "Minimal number of cards per deck",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "cardsPerPackTo": {
        "type": "integer",
        "description": "Minimal number of cards per deck",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "packsPerBoxFrom": {
        "type": "integer",
        "description": "Minimal number of packs per box",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "packsPerBoxTo": {
        "type": "integer",
        "description": "Minimal number of packs per box",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "boxesPerCaseFrom": {
        "type": "integer",
        "description": "Minimal number of boxes per case",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "boxesPerCaseTo": {
        "type": "integer",
        "description": "Minimal number of boxes per case",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "productionRunFrom": {
        "type": "integer",
        "description": "Minimal production run",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "productionRunTo": {
        "type": "integer",
        "description": "Minimal production run",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "productionRunUnit": {
        "type": "string",
        "description": "Production run unit"
      },
      "cardWidthFrom": {
        "type": "number",
        "description": "Minimal card width, in inches",
        "format": "double",
        "minimum": -1.7976931348623157e+308,
        "maximum": 1.7976931348623157e+308
      },
      "cardWidthTo": {
        "type": "number",
        "description": "Minimal card width, in inches",
        "format": "double",
        "minimum": -1.7976931348623157e+308,
        "maximum": 1.7976931348623157e+308
      },
      "cardHeightFrom": {
        "type": "number",
        "description": "Minimal card height, in inches",
        "format": "double",
        "minimum": -1.7976931348623157e+308,
        "maximum": 1.7976931348623157e+308
      },
      "cardHeightTo": {
        "type": "number",
        "description": "Minimal card height, in inches",
        "format": "double",
        "minimum": -1.7976931348623157e+308,
        "maximum": 1.7976931348623157e+308
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
export default PostTradingcardsetSearch
