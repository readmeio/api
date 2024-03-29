const PostMovieSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Movie title"
      },
      "stardateFrom": {
        "type": "number",
        "description": "Starting stardate of movie story",
        "format": "float",
        "minimum": -3.402823669209385e+38,
        "maximum": 3.402823669209385e+38
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of movie story",
        "format": "float",
        "minimum": -3.402823669209385e+38,
        "maximum": 3.402823669209385e+38
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of movie story",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of movie story",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "usReleaseDateFrom": {
        "type": "string",
        "description": "Minimal date the movie was first released in the United States",
        "format": "date"
      },
      "usReleaseDateTo": {
        "type": "string",
        "description": "Maximal date the movie was first released in the United States",
        "format": "date"
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
export default PostMovieSearch
