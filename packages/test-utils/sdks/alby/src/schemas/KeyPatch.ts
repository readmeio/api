const KeyPatch = {
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
  "x-readme-ref-name": "key_patch"
} as const;
export default KeyPatch
