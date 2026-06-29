const PostAstronomicalobjectSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Astronomical object name"
      },
      "astronomicalObjectType": {
        "type": "string",
        "description": "Type of astronomical object"
      },
      "locationUid": {
        "type": "string",
        "description": "Unique ID of astronomical object containing objects being searched"
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
export default PostAstronomicalobjectSearch
