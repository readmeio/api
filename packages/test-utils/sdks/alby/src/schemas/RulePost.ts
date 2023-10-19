import AmqpExternalRulePost from './AmqpExternalRulePost';
import AmqpRulePost from './AmqpRulePost';
import AwsKinesisRulePost from './AwsKinesisRulePost';
import AwsLambdaRulePost from './AwsLambdaRulePost';
import AwsSqsRulePost from './AwsSqsRulePost';
import AzureFunctionRulePost from './AzureFunctionRulePost';
import CloudflareWorkerRulePost from './CloudflareWorkerRulePost';
import GoogleCloudFunctionRulePost from './GoogleCloudFunctionRulePost';
import HttpRulePost from './HttpRulePost';
import IftttRulePost from './IftttRulePost';
import UnsupportedRuleResponse from './UnsupportedRuleResponse';
import ZapierRulePost from './ZapierRulePost';

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
