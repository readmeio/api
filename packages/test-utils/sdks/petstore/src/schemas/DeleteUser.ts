const DeleteUser = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "description": "The name that needs to be deleted"
          }
        },
        "required": [
          "username"
        ]
      }
    ]
  }
} as const;
export default DeleteUser
