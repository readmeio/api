const PostMagazineseriesSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Magazine series title"
      },
      "publishedYearFrom": {
        "type": "integer",
        "description": "Starting year the magazine series was published",
        "format": "int32"
      },
      "publishedYearTo": {
        "type": "integer",
        "description": "Ending year the magazine series was published",
        "format": "int32"
      },
      "numberOfIssuesFrom": {
        "type": "integer",
        "description": "Minimal number of issues",
        "format": "int32"
      },
      "numberOfIssuesTo": {
        "type": "integer",
        "description": "Maximal number of issues",
        "format": "int32"
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
export default PostMagazineseriesSearch
