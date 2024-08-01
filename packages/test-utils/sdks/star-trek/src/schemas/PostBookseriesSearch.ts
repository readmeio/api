const PostBookseriesSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Book series title"
      },
      "publishedYearFrom": {
        "type": "integer",
        "description": "Starting year the book series was published",
        "format": "int32"
      },
      "publishedYearTo": {
        "type": "integer",
        "description": "Ending year the book series was published",
        "format": "int32"
      },
      "numberOfBooksFrom": {
        "type": "integer",
        "description": "Minimal number of books",
        "format": "int32"
      },
      "numberOfBooksTo": {
        "type": "integer",
        "description": "Maximal number of books",
        "format": "int32"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of book series stories",
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of book series stories",
        "format": "int32"
      },
      "miniseries": {
        "type": "boolean",
        "description": "Whether it should be a miniseries"
      },
      "eBookSeries": {
        "type": "boolean",
        "description": "Whether it should be an e-book series"
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
export default PostBookseriesSearch
