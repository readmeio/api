const PatchAppsId = {
  "body": {
    "additionalProperties": false,
    "properties": {
      "apnsCertificate": {
        "description": "The Apple Push Notification service certificate.",
        "type": [
          "string",
          "null"
        ]
      },
      "apnsPrivateKey": {
        "description": "The Apple Push Notification service private key.",
        "type": [
          "string",
          "null"
        ]
      },
      "apnsUseSandboxEndpoint": {
        "description": "The Apple Push Notification service sandbox endpoint.",
        "type": [
          "boolean",
          "null"
        ]
      },
      "fcmKey": {
        "description": "The Firebase Cloud Messaging key.",
        "type": [
          "string",
          "null"
        ],
        "examples": [
          false
        ]
      },
      "name": {
        "description": "The name of the application for your reference only.",
        "type": "string",
        "examples": [
          "My App"
        ]
      },
      "status": {
        "description": "The status of the application. Can be `enabled` or `disabled`. Enabled means available to accept inbound connections and all services are available.",
        "enum": [
          "enabled",
          "disabled"
        ],
        "type": "string",
        "examples": [
          "enabled"
        ]
      },
      "tlsOnly": {
        "description": "Enforce TLS for all connections.",
        "type": [
          "boolean",
          "null"
        ],
        "examples": [
          true
        ]
      }
    },
    "type": "object",
    "title": "app_patch",
    "x-readme-ref-name": "app_patch",
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
