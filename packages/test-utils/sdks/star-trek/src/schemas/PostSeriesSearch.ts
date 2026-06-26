const PostSeriesSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Series title"
      },
      "abbreviation": {
        "type": "string",
        "description": "Series abbreviation"
      },
      "productionStartYearFrom": {
        "type": "integer",
        "description": "Minimal year the series production started",
        "format": "int32"
      },
      "productionStartYearTo": {
        "type": "integer",
        "description": "Maximal year the series production started",
        "format": "int32"
      },
      "productionEndYearFrom": {
        "type": "integer",
        "description": "Minimal year the series production ended",
        "format": "int32"
      },
      "productionEndYearTo": {
        "type": "integer",
        "description": "Maximal year the series production ended",
        "format": "int32"
      },
      "originalRunStartDateFrom": {
        "type": "string",
        "description": "Minimal date the series originally ran from",
        "format": "date"
      },
      "originalRunStartDateTo": {
        "type": "string",
        "description": "Maximal date the series originally ran from",
        "format": "date"
      },
      "originalRunEndDateFrom": {
        "type": "string",
        "description": "Minimal date the series originally ran to",
        "format": "date"
      },
      "originalRunEndDateTo": {
        "type": "string",
        "description": "Maximal date the series originally ran to",
        "format": "date"
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
export default PostSeriesSearch
