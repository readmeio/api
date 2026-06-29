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
        "format": "float"
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of movie story",
        "format": "float"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of movie story",
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of movie story",
        "format": "int32"
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
export default PostMovieSearch
