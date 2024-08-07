const UpdatePetWithForm = {
  "formData": {
    "type": "object",
    "properties": {
      "name": {
        "description": "Updated name of the pet",
        "type": "string"
      },
      "status": {
        "description": "Updated status of the pet",
        "type": "string"
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "ID of pet that needs to be updated"
          }
        },
        "required": [
          "petId"
        ]
      }
    ]
  }
} as const;
export default UpdatePetWithForm
