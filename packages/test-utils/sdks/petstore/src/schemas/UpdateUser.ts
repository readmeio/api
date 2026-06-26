const UpdateUser = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "description": "name that need to be updated"
          }
        },
        "required": [
          "username"
        ]
      }
    ]
  }
} as const;
export default UpdateUser
