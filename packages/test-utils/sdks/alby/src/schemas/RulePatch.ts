import AmqpExternalRulePatch from './AmqpExternalRulePatch';
import AmqpRulePatch from './AmqpRulePatch';
import AwsKinesisRulePatch from './AwsKinesisRulePatch';
import AwsLambdaRulePatch from './AwsLambdaRulePatch';
import AwsSqsRulePatch from './AwsSqsRulePatch';
import AzureFunctionRulePatch from './AzureFunctionRulePatch';
import CloudflareWorkerRulePatch from './CloudflareWorkerRulePatch';
import GoogleCloudFunctionRulePatch from './GoogleCloudFunctionRulePatch';
import HttpRulePatch from './HttpRulePatch';
import IftttRulePatch from './IftttRulePatch';
import ZapierRulePatch from './ZapierRulePatch';

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
