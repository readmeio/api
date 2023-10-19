import AwsAccessKeys from './AwsAccessKeys';
import AwsAssumeRole from './AwsAssumeRole';
import RuleSource from './RuleSource';

const AwsLambdaRulePost = {
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
      "description": "The type of rule. In this case AWS Lambda. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
      "enum": [
        "aws/lambda"
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
        "functionName": {
          "description": "The name of your AWS Lambda Function.",
          "type": "string"
        },
        "region": {
          "description": "The region is which your AWS Lambda Function is hosted. See the <a href=\"https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region\">AWS documentation</a> for more detail.",
          "type": "string",
          "examples": [
            "us-west-1"
          ]
        }
      },
      "required": [
        "region",
        "functionName",
        "authentication"
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
  "title": "aws_lambda_rule_post",
  "x-readme-ref-name": "aws_lambda_rule_post"
} as const;
export default AwsLambdaRulePost
