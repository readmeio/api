const PatchAppsId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
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
