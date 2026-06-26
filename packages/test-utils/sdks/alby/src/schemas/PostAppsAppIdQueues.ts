const PostAppsAppIdQueues = {
  "body": {
    "additionalProperties": false,
    "properties": {
      "maxLength": {
        "description": "Message limit in number of messages.",
        "type": "integer",
        "examples": [
          10000
        ]
      },
      "name": {
        "description": "A friendly name for your queue.",
        "type": "string",
        "examples": [
          "My queue"
        ]
      },
      "region": {
        "description": "The data center region. US East (Virginia) or EU West (Ireland). Values are `us-east-1-a` or `eu-west-1-a`.",
        "type": "string",
        "examples": [
          "us-east-1-a"
        ]
      },
      "ttl": {
        "description": "TTL in minutes.",
        "type": "integer",
        "examples": [
          60
        ]
      }
    },
    "required": [
      "name",
      "ttl",
      "maxLength",
      "region"
    ],
    "type": "object",
    "title": "queue",
    "x-readme-ref-name": "queue",
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
          }
        },
        "required": [
          "app_id"
        ]
      }
    ]
  }
} as const;
export default PostAppsAppIdQueues
