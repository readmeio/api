import AmqpExternalRulePost from './AmqpExternalRulePost.js';
import AmqpRulePost from './AmqpRulePost.js';
import AwsKinesisRulePost from './AwsKinesisRulePost.js';
import AwsLambdaRulePost from './AwsLambdaRulePost.js';
import AwsSqsRulePost from './AwsSqsRulePost.js';
import AzureFunctionRulePost from './AzureFunctionRulePost.js';
import CloudflareWorkerRulePost from './CloudflareWorkerRulePost.js';
import GoogleCloudFunctionRulePost from './GoogleCloudFunctionRulePost.js';
import HttpRulePost from './HttpRulePost.js';
import IftttRulePost from './IftttRulePost.js';
import UnsupportedRuleResponse from './UnsupportedRuleResponse.js';
import ZapierRulePost from './ZapierRulePost.js';

const RulePost = {
  "discriminator": {
    "mapping": {
      "amqp": "#/components/schemas/amqp_rule_post",
      "amqp/external": "#/components/schemas/amqp_external_rule_post",
      "aws/kinesis": "#/components/schemas/aws_kinesis_rule_post",
      "aws/lambda": "#/components/schemas/aws_lambda_rule_post",
      "aws/sqs": "#/components/schemas/aws_sqs_rule_post",
      "http": "#/components/schemas/http_rule_post",
      "http/azure-function": "#/components/schemas/azure_function_rule_post",
      "http/cloudflare-worker": "#/components/schemas/cloudflare_worker_rule_post",
      "http/google-cloud-function": "#/components/schemas/google_cloud_function_rule_post",
      "http/ifttt": "#/components/schemas/ifttt_rule_post",
      "http/zapier": "#/components/schemas/zapier_rule_post",
      "unsupported": "#/components/schemas/unsupported_rule_response"
    },
    "propertyName": "ruleType"
  },
  "oneOf": [
    HttpRulePost,
    IftttRulePost,
    ZapierRulePost,
    CloudflareWorkerRulePost,
    AzureFunctionRulePost,
    GoogleCloudFunctionRulePost,
    AwsLambdaRulePost,
    AwsKinesisRulePost,
    AwsSqsRulePost,
    AmqpRulePost,
    AmqpExternalRulePost,
    UnsupportedRuleResponse
  ],
  "title": "rule_post",
  "x-readme-ref-name": "rule_post"
} as const;
export default RulePost
