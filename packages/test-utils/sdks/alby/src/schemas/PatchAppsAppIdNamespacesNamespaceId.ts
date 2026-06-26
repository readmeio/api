const PatchAppsAppIdNamespacesNamespaceId = {
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
          "namespace_id": {
            "type": "string",
            "description": "The namespace ID."
          }
        },
        "required": [
          "app_id",
          "namespace_id"
        ]
      }
    ]
  }
} as const;
export default PatchAppsAppIdNamespacesNamespaceId
