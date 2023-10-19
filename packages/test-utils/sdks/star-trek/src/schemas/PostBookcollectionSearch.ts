const PostBookcollectionSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Book collection title"
      },
      "publishedYearFrom": {
        "type": "integer",
        "description": "Starting year the book collection was published",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "publishedYearTo": {
        "type": "integer",
        "description": "Ending year the book collection was published",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "numberOfPagesFrom": {
        "type": "integer",
        "description": "Minimal number of pages",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "numberOfPagesTo": {
        "type": "integer",
        "description": "Maximal number of pages",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "stardateFrom": {
        "type": "number",
        "description": "Starting stardate of book collection stories",
        "format": "float",
        "minimum": -3.402823669209385e+38,
        "maximum": 3.402823669209385e+38
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of book collections stories",
        "format": "float",
        "minimum": -3.402823669209385e+38,
        "maximum": 3.402823669209385e+38
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of book collection stories",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of book collections stories",
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
export default PostBookcollectionSearch
