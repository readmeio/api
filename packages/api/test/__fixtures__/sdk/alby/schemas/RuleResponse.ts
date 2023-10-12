import AmqpExternalRuleResponse from './AmqpExternalRuleResponse';
import AmqpRuleResponse from './AmqpRuleResponse';
import AwsKinesisRuleResponse from './AwsKinesisRuleResponse';
import AwsLambdaRuleResponse from './AwsLambdaRuleResponse';
import AwsSqsRuleResponse from './AwsSqsRuleResponse';
import AzureFunctionRuleResponse from './AzureFunctionRuleResponse';
import CloudflareWorkerRuleResponse from './CloudflareWorkerRuleResponse';
import GoogleCloudFunctionRuleResponse from './GoogleCloudFunctionRuleResponse';
import HttpRuleResponse from './HttpRuleResponse';
import IftttRuleResponse from './IftttRuleResponse';
import ZapierRuleResponse from './ZapierRuleResponse';

const RuleResponse = {"discriminator":{"mapping":{"amqp":"#/components/schemas/amqp_rule_response","amqp/external":"#/components/schemas/amqp_external_rule_response","aws/kinesis":"#/components/schemas/aws_kinesis_rule_response","aws/lambda":"#/components/schemas/aws_lambda_rule_response","aws/sqs":"#/components/schemas/aws_sqs_rule_response","http":"#/components/schemas/http_rule_response","http/azure-function":"#/components/schemas/azure_function_rule_response","http/cloudflare-worker":"#/components/schemas/cloudflare_worker_rule_response","http/google-cloud-function":"#/components/schemas/google_cloud_function_rule_response","http/ifttt":"#/components/schemas/ifttt_rule_response","http/zapier":"#/components/schemas/zapier_rule_response"},"propertyName":"ruleType"},"oneOf":[HttpRuleResponse,IftttRuleResponse,ZapierRuleResponse,CloudflareWorkerRuleResponse,AzureFunctionRuleResponse,GoogleCloudFunctionRuleResponse,AwsLambdaRuleResponse,AwsKinesisRuleResponse,AwsSqsRuleResponse,AmqpRuleResponse,AmqpExternalRuleResponse],"title":"rule_response","x-readme-ref-name":"rule_response"} as const
;
export default RuleResponse
