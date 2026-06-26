const UploadFile = {
  "body": {
    "type": "object",
    "properties": {
      "additionalMetadata": {
        "description": "Additional data to pass to server",
        "type": "string"
      },
      "file": {
        "description": "file to upload",
        "type": "string",
        "format": "binary"
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
            "description": "ID of pet to update"
          }
        },
        "required": [
          "petId"
        ]
      }
    ]
  }
} as const;
export default UploadFile
