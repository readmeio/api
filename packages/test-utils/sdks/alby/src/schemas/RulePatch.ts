import AmqpExternalRulePatch from './AmqpExternalRulePatch.js';
import AmqpRulePatch from './AmqpRulePatch.js';
import AwsKinesisRulePatch from './AwsKinesisRulePatch.js';
import AwsLambdaRulePatch from './AwsLambdaRulePatch.js';
import AwsSqsRulePatch from './AwsSqsRulePatch.js';
import AzureFunctionRulePatch from './AzureFunctionRulePatch.js';
import CloudflareWorkerRulePatch from './CloudflareWorkerRulePatch.js';
import GoogleCloudFunctionRulePatch from './GoogleCloudFunctionRulePatch.js';
import HttpRulePatch from './HttpRulePatch.js';
import IftttRulePatch from './IftttRulePatch.js';
import ZapierRulePatch from './ZapierRulePatch.js';

const RulePatch = {
  "discriminator": {
    "mapping": {
      "amqp": "#/components/schemas/amqp_rule_patch",
      "amqp/external": "#/components/schemas/amqp_external_rule_patch",
      "aws/kinesis": "#/components/schemas/aws_kinesis_rule_patch",
      "aws/lambda": "#/components/schemas/aws_lambda_rule_patch",
      "aws/sqs": "#/components/schemas/aws_sqs_rule_patch",
      "http": "#/components/schemas/http_rule_patch",
      "http/azure-function": "#/components/schemas/azure_function_rule_patch",
      "http/cloudflare-worker": "#/components/schemas/cloudflare_worker_rule_patch",
      "http/google-cloud-function": "#/components/schemas/google_cloud_function_rule_patch",
      "http/ifttt": "#/components/schemas/ifttt_rule_patch",
      "http/zapier": "#/components/schemas/zapier_rule_patch"
    },
    "propertyName": "ruleType"
  },
  "oneOf": [
    HttpRulePatch,
    IftttRulePatch,
    ZapierRulePatch,
    CloudflareWorkerRulePatch,
    AzureFunctionRulePatch,
    GoogleCloudFunctionRulePatch,
    AwsLambdaRulePatch,
    AwsKinesisRulePatch,
    AwsSqsRulePatch,
    AmqpRulePatch,
    AmqpExternalRulePatch
  ],
  "title": "rule_patch",
  "x-readme-ref-name": "rule_patch"
} as const;
export default RulePatch
