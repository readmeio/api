import AmqpExternalRuleResponse from './AmqpExternalRuleResponse.js';
import AmqpRuleResponse from './AmqpRuleResponse.js';
import AwsKinesisRuleResponse from './AwsKinesisRuleResponse.js';
import AwsLambdaRuleResponse from './AwsLambdaRuleResponse.js';
import AwsSqsRuleResponse from './AwsSqsRuleResponse.js';
import AzureFunctionRuleResponse from './AzureFunctionRuleResponse.js';
import CloudflareWorkerRuleResponse from './CloudflareWorkerRuleResponse.js';
import GoogleCloudFunctionRuleResponse from './GoogleCloudFunctionRuleResponse.js';
import HttpRuleResponse from './HttpRuleResponse.js';
import IftttRuleResponse from './IftttRuleResponse.js';
import ZapierRuleResponse from './ZapierRuleResponse.js';

const RuleResponse = {
  "discriminator": {
    "mapping": {
      "amqp": "#/components/schemas/amqp_rule_response",
      "amqp/external": "#/components/schemas/amqp_external_rule_response",
      "aws/kinesis": "#/components/schemas/aws_kinesis_rule_response",
      "aws/lambda": "#/components/schemas/aws_lambda_rule_response",
      "aws/sqs": "#/components/schemas/aws_sqs_rule_response",
      "http": "#/components/schemas/http_rule_response",
      "http/azure-function": "#/components/schemas/azure_function_rule_response",
      "http/cloudflare-worker": "#/components/schemas/cloudflare_worker_rule_response",
      "http/google-cloud-function": "#/components/schemas/google_cloud_function_rule_response",
      "http/ifttt": "#/components/schemas/ifttt_rule_response",
      "http/zapier": "#/components/schemas/zapier_rule_response"
    },
    "propertyName": "ruleType"
  },
  "oneOf": [
    HttpRuleResponse,
    IftttRuleResponse,
    ZapierRuleResponse,
    CloudflareWorkerRuleResponse,
    AzureFunctionRuleResponse,
    GoogleCloudFunctionRuleResponse,
    AwsLambdaRuleResponse,
    AwsKinesisRuleResponse,
    AwsSqsRuleResponse,
    AmqpRuleResponse,
    AmqpExternalRuleResponse
  ],
  "title": "rule_response",
  "x-readme-ref-name": "rule_response"
} as const;
export default RuleResponse
