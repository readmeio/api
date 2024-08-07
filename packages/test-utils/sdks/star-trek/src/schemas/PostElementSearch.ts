const PostElementSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Element name"
      },
      "symbol": {
        "type": "string",
        "description": "Element symbol"
      },
      "transuranium": {
        "type": "boolean",
        "description": "Whether it should be a transuranium"
      },
      "gammaSeries": {
        "type": "boolean",
        "description": "Whether it should belong to Gamma series"
      },
      "hypersonicSeries": {
        "type": "boolean",
        "description": "Whether it should belong to Hypersonic series"
      },
      "megaSeries": {
        "type": "boolean",
        "description": "Whether it should belong to Mega series"
      },
      "omegaSeries": {
        "type": "boolean",
        "description": "Whether it should belong to Omega series"
      },
      "transonicSeries": {
        "type": "boolean",
        "description": "Whether it should belong to Transonic series"
      },
      "worldSeries": {
        "type": "boolean",
        "description": "Whether it should belong to World series"
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
export default PostElementSearch
