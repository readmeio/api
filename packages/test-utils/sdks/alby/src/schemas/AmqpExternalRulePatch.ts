import RuleSource from './RuleSource.js';

const AmqpExternalRulePatch = {
  "additionalProperties": false,
  "properties": {
    "requestMode": {
      "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
      "enum": [
        "single"
      ],
      "type": "string",
      "examples": [
        "single"
      ]
    },
    "ruleType": {
      "description": "The type of rule. In this case AMQP external (using Firehose). See the <a href=\"https://ably.com/documentation/general/firehose\">Ably documentation</a> for further information.",
      "enum": [
        "amqp/external"
      ],
      "type": "string"
    },
    "source": RuleSource,
    "status": {
      "description": "The status of the rule. Rules can be enabled or disabled.",
      "enum": [
        "enabled",
        "disabled"
      ],
      "type": "string",
      "examples": [
        "enabled"
      ]
    },
    "target": {
      "additionalProperties": false,
      "properties": {
        "enveloped": {
          "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
          "type": [
            "boolean",
            "null"
          ]
        },
        "format": {
          "type": "string"
        },
        "headers": {
          "description": "If you have additional information to send, you'll need to include the relevant headers.",
          "items": {
            "properties": {
              "name": {
                "description": "The name of the header.",
                "type": "string"
              },
              "value": {
                "description": "The value of the header.",
                "type": "string"
              }
            },
            "type": "object"
          },
          "type": "array"
        },
        "mandatoryRoute": {
          "description": "Reject delivery of the message if the route does not exist, otherwise fail silently.",
          "type": "boolean"
        },
        "messageTtl": {
          "description": "You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.",
          "type": "integer"
        },
        "persistentMessages": {
          "description": "Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.",
          "type": "boolean"
        },
        "routingKey": {
          "description": "The AMQP routing key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "type": "object"
    }
  },
  "type": "object",
  "title": "amqp_external_rule_patch",
  "x-readme-ref-name": "amqp_external_rule_patch"
} as const;
export default AmqpExternalRulePatch
