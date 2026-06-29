const GetFood = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "uid": {
            "type": "string",
            "description": "Food unique ID"
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
export default GetFood
