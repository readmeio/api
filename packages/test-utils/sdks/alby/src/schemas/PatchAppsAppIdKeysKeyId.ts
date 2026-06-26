const PatchAppsAppIdKeysKeyId = {
  "body": {
    "additionalProperties": false,
    "properties": {
      "capabilities": {
        "description": "The capabilities that this key has. More information on capabilities can be found in the <a href=\"https://ably.com/documentation/core-features/authentication#capabilities-explained\">Ably documentation</a>.",
        "items": {
          "enum": [
            "publish",
            "subscribe",
            "history",
            "presence",
            "channel-metadata",
            "push-admin",
            "push-subscribe",
            "statistics"
          ],
          "type": "string"
        },
        "type": "array"
      },
      "channels": {
        "description": "Specify the channels and queues that this key can be used with.",
        "type": "string"
      },
      "name": {
        "description": "The name for your API key. This is a friendly name for your reference.",
        "type": "string"
      }
    },
    "type": "object",
    "title": "key_patch",
    "x-readme-ref-name": "key_patch",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
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
