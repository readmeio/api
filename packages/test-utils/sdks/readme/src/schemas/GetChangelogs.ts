const GetChangelogs = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "perPage": {
            "type": "integer",
            "default": 10,
            "minimum": 1,
            "maximum": 100,
            "description": "Number of items to include in pagination (up to 100, defaults to 10)."
          },
          "page": {
            "type": "integer",
            "default": 1,
            "minimum": 1,
            "description": "Used to specify further pages (starts at 1)."
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "Link": {
          "type": "string",
          "description": "Pagination information. See https://docs.readme.com/main/reference/pagination for more information."
        },
        "x-total-count": {
          "type": "string",
          "description": "The total amount of results, ignoring pagination. See https://docs.readme.com/main/reference/pagination for more information about pagination."
        }
      }
    }
  }
} as const;
export default GetChangelogs
