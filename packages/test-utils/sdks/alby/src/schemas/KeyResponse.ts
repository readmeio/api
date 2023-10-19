const KeyResponse = {
  "additionalProperties": false,
  "properties": {
    "appId": {
      "description": "The Ably application ID which this key is associated with.",
      "type": "string",
      "examples": [
        "28GY6a"
      ]
    },
    "capability": {
      "additionalProperties": {
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
          "type": "string",
          "description": "`publish` `subscribe` `history` `presence` `channel-metadata` `push-admin` `push-subscribe` `statistics`"
        },
        "type": "array"
      },
      "description": "The capabilities that this key has. More information on capabilities can be found in the <a href=\"https://ably.com/documentation/core-features/authentication#capabilities-explained\">Ably documentation</a>.",
      "type": "object"
    },
    "created": {
      "description": "Unix timestamp representing the date and time of creation of the key.",
      "type": "integer",
      "examples": [
        1602844091815
      ]
    },
    "id": {
      "description": "The key ID.",
      "type": "string"
    },
    "key": {
      "description": "The complete API key including API secret.",
      "type": "string"
    },
    "modified": {
      "description": "Unix timestamp representing the date and time of the last modification of the key.",
      "type": "integer",
      "examples": [
        1614679682091
      ]
    },
    "name": {
      "description": "The name of the application this key is associated with.",
      "type": "string"
    }
  },
  "type": "object",
  "title": "key_response",
  "x-readme-ref-name": "key_response"
} as const;
export default KeyResponse
