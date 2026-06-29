const PostVideoreleaseSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Video release title"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of video release story",
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of video release story",
        "format": "int32"
      },
      "runTimeFrom": {
        "type": "integer",
        "description": "Minimal run time, in minutes",
        "format": "int32"
      },
      "runTimeTo": {
        "type": "integer",
        "description": "Minimal run time, in minutes",
        "format": "int32"
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
export default PostVideoreleaseSearch
