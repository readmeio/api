const PostAppsIdPkcs12 = {
  "body": {
    "additionalProperties": false,
    "properties": {
      "p12File": {
        "description": "The `.p12` file containing the app's APNs information.",
        "format": "binary",
        "type": "string"
      },
      "p12Pass": {
        "description": "The password for the corresponding `.p12` file.",
        "type": "string"
      }
    },
    "required": [
      "p12File",
      "p12Pass"
    ],
    "type": "object",
    "title": "app_pkcs12",
    "x-readme-ref-name": "app_pkcs12",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The application ID."
          }
        },
        "required": [
          "id"
        ]
      }
    ]
  }
} as const;
export default PostAppsIdPkcs12
