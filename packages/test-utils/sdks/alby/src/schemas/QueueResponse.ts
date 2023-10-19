const QueueResponse = {
  "additionalProperties": false,
  "properties": {
    "amqp": {
      "additionalProperties": false,
      "properties": {
        "queueName": {
          "description": "Name of the Ably queue.",
          "type": "string",
          "examples": [
            "28AB6w:My queue"
          ]
        },
        "uri": {
          "description": "URI for the AMQP queue interface.",
          "type": "string",
          "examples": [
            "amqps://us-east-1-a-queue.ably.io:5671/shared"
          ]
        }
      },
      "type": "object"
    },
    "appId": {
      "description": "The Ably application ID.",
      "type": "string",
      "examples": [
        "28AB6w"
      ]
    },
    "deadletter": {
      "description": "A boolean that indicates whether this is a dead letter queue or not.",
      "type": "boolean",
      "examples": [
        false
      ]
    },
    "deadletterId": {
      "type": [
        "string",
        "null"
      ],
      "examples": [
        "28AB6w:us-east-1-a:deadletter"
      ]
    },
    "id": {
      "description": "The ID of the Ably queue",
      "type": "string",
      "examples": [
        "28AB6w:us-east-1-a:My queue"
      ]
    },
    "maxLength": {
      "description": "Message limit in number of messages.",
      "type": "integer",
      "examples": [
        10000
      ]
    },
    "messages": {
      "additionalProperties": false,
      "description": "Details of messages in the queue.",
      "properties": {
        "ready": {
          "description": "The number of ready messages in the queue.",
          "type": [
            "integer",
            "null"
          ],
          "examples": [
            0
          ]
        },
        "total": {
          "description": "The total number of messages in the queue.",
          "type": [
            "integer",
            "null"
          ],
          "examples": [
            0
          ]
        },
        "unacknowledged": {
          "description": "The number of unacknowledged messages in the queue.",
          "type": [
            "integer",
            "null"
          ],
          "examples": [
            0
          ]
        }
      },
      "type": "object"
    },
    "name": {
      "description": "The friendly name of the queue.",
      "type": "string",
      "examples": [
        "My queue"
      ]
    },
    "region": {
      "description": "The data center region for the queue.",
      "type": "string",
      "examples": [
        "eu-west-1-a"
      ]
    },
    "state": {
      "description": "The current state of the queue.",
      "type": "string",
      "examples": [
        "Running"
      ]
    },
    "stats": {
      "additionalProperties": false,
      "properties": {
        "acknowledgementRate": {
          "description": "The rate at which messages are acknowledged. Rate is messages per minute.",
          "type": [
            "number",
            "null"
          ]
        },
        "deliveryRate": {
          "description": "The rate at which messages are delivered from the queue. Rate is messages per minute.",
          "type": [
            "number",
            "null"
          ]
        },
        "publishRate": {
          "description": "The rate at which messages are published to the queue. Rate is messages per minute.",
          "type": [
            "number",
            "null"
          ]
        }
      },
      "type": "object"
    },
    "stomp": {
      "additionalProperties": false,
      "properties": {
        "destination": {
          "description": "Destination queue.",
          "type": "string",
          "examples": [
            "/amqp/queue/28AB6w:My queue"
          ]
        },
        "host": {
          "description": "The host type for the queue.",
          "type": "string",
          "examples": [
            "shared"
          ]
        },
        "uri": {
          "description": "URI for the STOMP queue interface.",
          "type": "string",
          "examples": [
            "stomp://us-east-1-a-queue.ably.io:61614"
          ]
        }
      },
      "type": "object"
    },
    "ttl": {
      "description": "TTL in minutes.",
      "type": "integer",
      "examples": [
        60
      ]
    }
  },
  "type": "object",
  "title": "queue_response",
  "x-readme-ref-name": "queue_response"
} as const;
export default QueueResponse
