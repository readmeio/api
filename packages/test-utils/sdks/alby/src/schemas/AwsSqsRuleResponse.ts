import AwsAccessKeysResponse from './AwsAccessKeysResponse';
import AwsAssumeRole from './AwsAssumeRole';
import RuleSource from './RuleSource';

const AwsSqsRuleResponse = {
  "additionalProperties": false,
  "properties": {
    "_links": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": true
    },
    "appId": {
      "description": "The Ably application ID.",
      "type": "string",
      "examples": [
        "28GY6a"
      ]
    },
    "created": {
      "description": "Unix timestamp representing the date and time of creation of the rule.",
      "type": "number",
      "examples": [
        1602844091815
      ]
    },
    "id": {
      "description": "The rule ID.",
      "type": "string",
      "examples": [
        "83IzAB"
      ]
    },
    "modified": {
      "description": "Unix timestamp representing the date and time of last modification of the rule.",
      "type": "number",
      "examples": [
        1614679682091
      ]
    },
    "requestMode": {
      "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.\n\n`single`",
      "enum": [
        "single"
      ],
      "type": "string",
      "examples": [
        "single"
      ]
    },
    "ruleType": {
      "description": "The type of rule. In this case AWS SQS. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.\n\n`aws/sqs`",
      "enum": [
        "aws/sqs"
      ],
      "type": "string"
    },
    "source": RuleSource,
    "status": {
      "description": "The status of the rule. Rules can be enabled or disabled.\n\n`enabled` `disabled`",
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
              "credentials": "#/components/schemas/aws_access_keys_response"
            },
            "propertyName": "authenticationMode"
          },
          "oneOf": [
            AwsAccessKeysResponse,
            AwsAssumeRole
          ]
        },
        "awsAccountId": {
          "description": "Your AWS account ID.",
          "type": "string"
        },
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
        "queueName": {
          "description": "The AWS SQS queue name.",
          "type": "string"
        },
        "region": {
          "description": "The region is which AWS SQS is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
          "type": "string",
          "examples": [
            "us-west-1"
          ]
        }
      },
      "required": [
        "region",
        "awsAccountId",
        "queueName",
        "authentication"
      ],
      "type": "object"
    },
    "version": {
      "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
      "type": "string"
    }
  },
  "required": [
    "ruleType",
    "requestMode",
    "source",
    "target"
  ],
  "type": "object",
  "title": "aws_sqs_rule_response",
  "x-readme-ref-name": "aws_sqs_rule_response"
} as const;
export default AwsSqsRuleResponse
