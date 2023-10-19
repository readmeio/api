const DeletePet = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
            "minimum": -9223372036854776000,
            "maximum": 9223372036854776000,
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Pet id to delete"
          }
        },
        "required": [
          "petId"
        ]
      },
      {
        "type": "object",
        "properties": {
          "api_key": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#"
          }
        },
        "required": []
      }
    ]
  }
} as const;
export default DeletePet
