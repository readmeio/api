const DeletePet = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
            "description": "Pet id to delete"
          }
        },
        "required": [
          "petId"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "api_key": {
            "type": "string"
          }
        }
      }
    ]
  }
} as const;
export default DeletePet
