const Me = {
  "additionalProperties": false,
  "properties": {
    "account": {
      "additionalProperties": false,
      "properties": {
        "id": {
          "description": "The account ID.",
          "type": "string",
          "examples": [
            "VpWaOA"
          ]
        },
        "name": {
          "description": "The name of the account.",
          "type": "string",
          "examples": [
            "Free account"
          ]
        }
      },
      "required": [
        "id",
        "name"
      ],
      "type": "object"
    },
    "token": {
      "additionalProperties": false,
      "properties": {
        "capabilities": {
          "description": "An array containing the access capabilities associated with the access token.",
          "items": {
            "type": "string"
          },
          "type": "array",
          "examples": [
            "write:namespace",
            "read:namespace",
            "write:queue",
            "read:queue",
            "write:rule",
            "read:rule",
            "write:key",
            "read:key",
            "write:app",
            "read:app"
          ]
        },
        "id": {
          "description": "The token ID. This is a UUID.",
          "type": "integer",
          "examples": [
            "C95837C9-184B-4CC2-8779-B769F960FADB"
          ]
        },
        "name": {
          "description": "The friendly name for the token.",
          "type": "string",
          "examples": [
            "My Token"
          ]
        }
      },
      "required": [
        "id",
        "name",
        "capabilities"
      ],
      "type": "object"
    },
    "user": {
      "additionalProperties": false,
      "properties": {
        "email": {
          "description": "Email address of the user associated with the account.",
          "type": "string"
        },
        "id": {
          "description": "The user ID associated with the account. This is a UUID.",
          "type": "integer",
          "examples": [
            "C95837C9-184B-4CC2-8779-B769F960FADB"
          ]
        }
      },
      "required": [
        "id",
        "email"
      ],
      "type": "object"
    }
  },
  "type": "object",
  "title": "me",
  "x-readme-ref-name": "me"
} as const;
export default Me
