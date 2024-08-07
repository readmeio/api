const PostBookSearch = {
  "formData": {
    "properties": {
      "title": {
        "type": "string",
        "description": "Book title"
      },
      "publishedYearFrom": {
        "type": "integer",
        "description": "Starting year the book was published",
        "format": "int32"
      },
      "publishedYearTo": {
        "type": "integer",
        "description": "Ending year the book was published",
        "format": "int32"
      },
      "numberOfPagesFrom": {
        "type": "integer",
        "description": "Minimal number of pages",
        "format": "int32"
      },
      "numberOfPagesTo": {
        "type": "integer",
        "description": "Maximal number of pages",
        "format": "int32"
      },
      "stardateFrom": {
        "type": "number",
        "description": "Starting stardate of book story",
        "format": "float"
      },
      "stardateTo": {
        "type": "number",
        "description": "Ending stardate of book story",
        "format": "float"
      },
      "yearFrom": {
        "type": "integer",
        "description": "Starting year of book story",
        "format": "int32"
      },
      "yearTo": {
        "type": "integer",
        "description": "Ending year of book story",
        "format": "int32"
      },
      "novel": {
        "type": "boolean",
        "description": "Whether it should be a novel"
      },
      "referenceBook": {
        "type": "boolean",
        "description": "Whether it should be a reference book"
      },
      "biographyBook": {
        "type": "boolean",
        "description": "Whether it should be a biography book"
      },
      "rolePlayingBook": {
        "type": "boolean",
        "description": "Whether it should be a role playing book"
      },
      "eBook": {
        "type": "boolean",
        "description": "Whether it should be an e-book"
      },
      "anthology": {
        "type": "boolean",
        "description": "Whether it should be an anthology"
      },
      "novelization": {
        "type": "boolean",
        "description": "Whether it should be novelization"
      },
      "audiobook": {
        "type": "boolean",
        "description": "Whether it should be an audiobook"
      },
      "audiobookAbridged": {
        "type": "boolean",
        "description": "Whether it should be an audiobook, abridged"
      },
      "audiobookPublishedYearFrom": {
        "type": "integer",
        "description": "Starting year the audiobook was published",
        "format": "int32"
      },
      "audiobookPublishedYearTo": {
        "type": "integer",
        "description": "Ending year the audiobook was published",
        "format": "int32"
      },
      "audiobookRunTimeFrom": {
        "type": "integer",
        "description": "Minimal audiobook run time, in minutes",
        "format": "int32"
      },
      "audiobookRunTimeTo": {
        "type": "integer",
        "description": "Maximal audiobook run time, in minutes",
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
export default PostBookSearch
