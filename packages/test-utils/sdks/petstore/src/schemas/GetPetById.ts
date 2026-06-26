const GetPetById = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
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
