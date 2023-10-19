const NamespacePost = {
  "additionalProperties": false,
  "properties": {
    "authenticated": {
      "default": false,
      "description": "If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href=\"https://knowledge.ably.com/authenticated-and-identified-clients\">Ably Knowledge base</a> for more details.",
      "type": "boolean",
      "examples": [
        false
      ]
    },
    "id": {
      "description": "The namespace or channel name that the channel rule will apply to. For example, if you specify `namespace` the namespace will be set to `namespace` and will match with channels `namespace:*` and `namespace`.",
      "type": "string",
      "examples": [
        "namespace"
      ]
    },
    "persistLast": {
      "default": false,
      "description": "If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
      "type": "boolean",
      "examples": [
        false
      ]
    },
    "persisted": {
      "default": false,
      "description": "If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.",
      "type": "boolean",
      "examples": [
        false
      ]
    },
    "pushEnabled": {
      "default": false,
      "description": "If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.",
      "type": "boolean",
      "examples": [
        false
      ]
    },
    "tlsOnly": {
      "default": false,
      "description": "If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.",
      "type": "boolean",
      "examples": [
        false
      ]
    }
  },
  "required": [
    "id"
  ],
  "type": "object",
  "title": "namespace_post",
  "x-readme-ref-name": "namespace_post"
} as const;
export default NamespacePost
