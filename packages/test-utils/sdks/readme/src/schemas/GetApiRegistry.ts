const GetApiRegistry = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "An API Registry UUID. This can be found by navigating to your API Reference page and viewing code snippets for Node with the `api` library."
          }
        },
        "required": [
          "uuid"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "additionalProperties": true,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetApiRegistry
