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
        "type": "object",
        "properties": {
          "petId": {
            "type": "integer",
            "format": "int64",
            "minimum": -9223372036854776000,
            "maximum": 9223372036854776000,
            "$schema": "http://json-schema.org/draft-04/schema#",
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
