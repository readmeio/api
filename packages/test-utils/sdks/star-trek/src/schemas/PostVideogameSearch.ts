const PostVideogameSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Video game title"
      },
      "releaseDateFrom": {
        "type": "string",
        "description": "Minimal date the video game was first released",
        "format": "date"
      },
      "releaseDateTo": {
        "type": "string",
        "description": "Minimal date the video game was first released",
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
export default PostVideogameSearch
