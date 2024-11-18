const GetPetById = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "ID of pet to return"
          }
        },
        "required": [
          "petId"
        ]
      }
    ]
  }
} as const;
export default GetPetById
