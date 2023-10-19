const DeleteUser = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
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
