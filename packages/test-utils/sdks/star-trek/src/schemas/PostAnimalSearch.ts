const PostAnimalSearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Animal name"
      },
      "earthAnimal": {
        "type": "boolean",
        "description": "Whether it should be an earth animal"
      },
      "earthInsect": {
        "type": "boolean",
        "description": "Whether it should be an earth insect"
      },
      "avian": {
        "type": "boolean",
        "description": "Whether it should be an avian"
      },
      "canine": {
        "type": "boolean",
        "description": "Whether it should be a canine"
      },
      "feline": {
        "type": "boolean",
        "description": "Whether it should be a feline"
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
export default PostAnimalSearch
