const GetComicstrip = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "uid": {
            "type": "string",
            "description": "Comic strip unique ID"
          },
          "apiKey": {
            "type": "string",
            "description": "API key"
          }
        },
        "required": [
          "uid"
        ]
      }
    ]
  }
} as const;
export default GetComicstrip
