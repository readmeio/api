const PostTradingcardSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Trading card name"
      },
      "tradingCardDeckUid": {
        "type": "string",
        "description": "UID of trading card deck"
      },
      "tradingCardSetUid": {
        "type": "string",
        "description": "UID of trading card set"
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
export default PostTradingcardSearch
