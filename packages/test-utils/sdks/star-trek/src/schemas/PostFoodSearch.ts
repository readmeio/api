const PostFoodSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Food name"
      },
      "earthlyOrigin": {
        "type": "boolean",
        "description": "Whether it should be of earthly origin"
      },
      "dessert": {
        "type": "boolean",
        "description": "Whether it should be a dessert"
      },
      "fruit": {
        "type": "boolean",
        "description": "Whether it should be a fruit"
      },
      "herbOrSpice": {
        "type": "boolean",
        "description": "Whether it should be an herb or a spice"
      },
      "sauce": {
        "type": "boolean",
        "description": "Whether it should be a sauce"
      },
      "soup": {
        "type": "boolean",
        "description": "Whether it should be a soup"
      },
      "beverage": {
        "type": "boolean",
        "description": "Whether it should be a beverage"
      },
      "alcoholicBeverage": {
        "type": "boolean",
        "description": "Whether it should be an alcoholic beverage"
      },
      "juice": {
        "type": "boolean",
        "description": "Whether it should be a juice"
      },
      "tea": {
        "type": "boolean",
        "description": "Whether it should be a tea"
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
export default PostFoodSearch
