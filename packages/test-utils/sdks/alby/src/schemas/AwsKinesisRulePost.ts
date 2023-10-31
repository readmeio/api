import AwsAccessKeys from './AwsAccessKeys.js';
import AwsAssumeRole from './AwsAssumeRole.js';
import RuleSource from './RuleSource.js';

const AwsKinesisRulePost = {
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
      "description": "The type of rule. In this case AWS Kinesis. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
      "enum": [
        "aws/kinesis"
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
        "authentication": {
          "discriminator": {
            "mapping": {
              "assumeRole": "#/components/schemas/aws_assume_role",
              "credentials": "#/components/schemas/aws_access_keys"
            },
            "propertyName": "authenticationMode"
          },
          "oneOf": [
            AwsAccessKeys,
            AwsAssumeRole
          ]
        },
        "enveloped": {
          "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
          "type": [
            "boolean",
            "null"
          ]
        },
        "format": {
          "description": "JSON provides a text-based encoding.",
          "enum": [
            "json"
          ],
          "type": "string"
        },
        "partitionKey": {
          "description": "The AWS Kinesis partition key. See this <a href=\"https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule\">Ably knowledge base article</a> for details.",
          "type": "string"
        },
        "region": {
          "description": "The region is which AWS Kinesis is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
          "type": "string",
          "examples": [
            "us-west-1"
          ]
        },
        "streamName": {
          "description": "The name of your AWS Kinesis Stream.",
          "type": "string"
        }
      },
      "required": [
        "region",
        "streamName",
        "partitionKey",
        "authentication",
        "format"
      ],
      "type": "object"
    }
  },
  "required": [
    "ruleType",
    "requestMode",
    "source",
    "target"
  ],
  "type": "object",
  "title": "aws_kinesis_rule_post",
  "x-readme-ref-name": "aws_kinesis_rule_post"
} as const;
export default AwsKinesisRulePost
