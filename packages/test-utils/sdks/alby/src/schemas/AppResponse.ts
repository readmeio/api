const AppResponse = {
  "additionalProperties": false,
  "properties": {
    "_links": {
      "description": "A link self-referencing the app that has been created.",
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": true
    },
    "accountId": {
      "description": "The ID of your Ably account.",
      "type": "string",
      "examples": [
        "WgRpOB"
      ]
    },
    "apnsUseSandboxEndpoint": {
      "description": "Apple Push Notification service endpoint.",
      "type": [
        "boolean",
        "null"
      ],
      "examples": [
        false
      ]
    },
    "id": {
      "description": "The application ID.",
      "type": "string",
      "examples": [
        "28AB6x"
      ]
    },
    "name": {
      "description": "The application name.",
      "type": "string",
      "examples": [
        "Default"
      ]
    },
    "status": {
      "description": "The application status. Disabled applications will not accept new connections and will return an error to all clients.\n\n`enabled` `disabled`",
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
      "description": "Enforce TLS for all connections. This setting overrides any channel setting.",
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
  "title": "app_response",
  "x-readme-ref-name": "app_response"
} as const;
export default AppResponse
