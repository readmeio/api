const PatchAppsId = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "The ID of application to be updated."
          }
        },
        "required": [
          "id"
        ]
      }
    ]
  }
} as const;
export default PatchAppsId
