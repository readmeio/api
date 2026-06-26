const PatchAppsAppIdKeysKeyId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "app_id": {
            "type": "string",
            "description": "The application ID."
          },
          "key_id": {
            "type": "string",
            "description": "The API key ID."
          }
        },
        "required": [
          "app_id",
          "key_id"
        ]
      }
    ]
  }
} as const;
export default PatchAppsAppIdKeysKeyId
