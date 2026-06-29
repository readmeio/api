const GetUserByName = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "description": "The name that needs to be fetched. Use user1 for testing. "
          }
        },
        "required": [
          "username"
        ]
      }
    ]
  }
} as const;
export default GetUserByName
