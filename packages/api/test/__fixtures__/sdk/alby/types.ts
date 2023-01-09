import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type AmqpExternalRulePatch = FromSchema<typeof schemas.AmqpExternalRulePatch>;
export type AmqpExternalRulePost = FromSchema<typeof schemas.AmqpExternalRulePost>;
export type AmqpExternalRuleResponse = FromSchema<typeof schemas.AmqpExternalRuleResponse>;
export type AmqpRulePatch = FromSchema<typeof schemas.AmqpRulePatch>;
export type AmqpRulePost = FromSchema<typeof schemas.AmqpRulePost>;
export type AmqpRuleResponse = FromSchema<typeof schemas.AmqpRuleResponse>;
export type AppPatch = FromSchema<typeof schemas.AppPatch>;
export type AppPkcs12 = FromSchema<typeof schemas.AppPkcs12>;
export type AppPost = FromSchema<typeof schemas.AppPost>;
export type AppResponse = FromSchema<typeof schemas.AppResponse>;
export type AwsAccessKeys = FromSchema<typeof schemas.AwsAccessKeys>;
export type AwsAccessKeysResponse = FromSchema<typeof schemas.AwsAccessKeysResponse>;
export type AwsAssumeRole = FromSchema<typeof schemas.AwsAssumeRole>;
export type AwsKinesisRulePatch = FromSchema<typeof schemas.AwsKinesisRulePatch>;
export type AwsKinesisRulePost = FromSchema<typeof schemas.AwsKinesisRulePost>;
export type AwsKinesisRuleResponse = FromSchema<typeof schemas.AwsKinesisRuleResponse>;
export type AwsLambdaRulePatch = FromSchema<typeof schemas.AwsLambdaRulePatch>;
export type AwsLambdaRulePost = FromSchema<typeof schemas.AwsLambdaRulePost>;
export type AwsLambdaRuleResponse = FromSchema<typeof schemas.AwsLambdaRuleResponse>;
export type AwsSqsRulePatch = FromSchema<typeof schemas.AwsSqsRulePatch>;
export type AwsSqsRulePost = FromSchema<typeof schemas.AwsSqsRulePost>;
export type AwsSqsRuleResponse = FromSchema<typeof schemas.AwsSqsRuleResponse>;
export type AzureFunctionRulePatch = FromSchema<typeof schemas.AzureFunctionRulePatch>;
export type AzureFunctionRulePost = FromSchema<typeof schemas.AzureFunctionRulePost>;
export type AzureFunctionRuleResponse = FromSchema<typeof schemas.AzureFunctionRuleResponse>;
export type CloudflareWorkerRulePatch = FromSchema<typeof schemas.CloudflareWorkerRulePatch>;
export type CloudflareWorkerRulePost = FromSchema<typeof schemas.CloudflareWorkerRulePost>;
export type CloudflareWorkerRuleResponse = FromSchema<typeof schemas.CloudflareWorkerRuleResponse>;
export type DeleteAppsAppIdNamespacesNamespaceIdMetadataParam = FromSchema<
  typeof schemas.DeleteAppsAppIdNamespacesNamespaceId.metadata
>;
export type DeleteAppsAppIdQueuesQueueIdMetadataParam = FromSchema<
  typeof schemas.DeleteAppsAppIdQueuesQueueId.metadata
>;
export type DeleteAppsAppIdRulesRuleIdMetadataParam = FromSchema<
  typeof schemas.DeleteAppsAppIdRulesRuleId.metadata
>;
export type DeleteAppsIdMetadataParam = FromSchema<typeof schemas.DeleteAppsId.metadata>;
export type Error = FromSchema<typeof schemas.Error>;
export type GetAccountsAccountIdAppsMetadataParam = FromSchema<
  typeof schemas.GetAccountsAccountIdApps.metadata
>;
export type GetAccountsAccountIdAppsResponse200 = FromSchema<
  (typeof schemas.GetAccountsAccountIdApps.response)['200']
>;
export type GetAppsAppIdKeysMetadataParam = FromSchema<typeof schemas.GetAppsAppIdKeys.metadata>;
export type GetAppsAppIdKeysResponse200 = FromSchema<
  (typeof schemas.GetAppsAppIdKeys.response)['200']
>;
export type GetAppsAppIdNamespacesMetadataParam = FromSchema<
  typeof schemas.GetAppsAppIdNamespaces.metadata
>;
export type GetAppsAppIdNamespacesResponse200 = FromSchema<
  (typeof schemas.GetAppsAppIdNamespaces.response)['200']
>;
export type GetAppsAppIdQueuesMetadataParam = FromSchema<
  typeof schemas.GetAppsAppIdQueues.metadata
>;
export type GetAppsAppIdQueuesResponse200 = FromSchema<
  (typeof schemas.GetAppsAppIdQueues.response)['200']
>;
export type GetAppsAppIdRulesMetadataParam = FromSchema<typeof schemas.GetAppsAppIdRules.metadata>;
export type GetAppsAppIdRulesResponse200 = FromSchema<
  (typeof schemas.GetAppsAppIdRules.response)['200']
>;
export type GetAppsAppIdRulesRuleIdMetadataParam = FromSchema<
  typeof schemas.GetAppsAppIdRulesRuleId.metadata
>;
export type GoogleCloudFunctionRulePatch = FromSchema<typeof schemas.GoogleCloudFunctionRulePatch>;
export type GoogleCloudFunctionRulePost = FromSchema<typeof schemas.GoogleCloudFunctionRulePost>;
export type GoogleCloudFunctionRuleResponse = FromSchema<
  typeof schemas.GoogleCloudFunctionRuleResponse
>;
export type HttpRulePatch = FromSchema<typeof schemas.HttpRulePatch>;
export type HttpRulePost = FromSchema<typeof schemas.HttpRulePost>;
export type HttpRuleResponse = FromSchema<typeof schemas.HttpRuleResponse>;
export type IftttRulePatch = FromSchema<typeof schemas.IftttRulePatch>;
export type IftttRulePost = FromSchema<typeof schemas.IftttRulePost>;
export type IftttRuleResponse = FromSchema<typeof schemas.IftttRuleResponse>;
export type KeyPatch = FromSchema<typeof schemas.KeyPatch>;
export type KeyPost = FromSchema<typeof schemas.KeyPost>;
export type KeyResponse = FromSchema<typeof schemas.KeyResponse>;
export type Me = FromSchema<typeof schemas.Me>;
export type NamespacePatch = FromSchema<typeof schemas.NamespacePatch>;
export type NamespacePost = FromSchema<typeof schemas.NamespacePost>;
export type NamespaceResponse = FromSchema<typeof schemas.NamespaceResponse>;
export type PatchAppsAppIdKeysKeyIdMetadataParam = FromSchema<
  typeof schemas.PatchAppsAppIdKeysKeyId.metadata
>;
export type PatchAppsAppIdNamespacesNamespaceIdMetadataParam = FromSchema<
  typeof schemas.PatchAppsAppIdNamespacesNamespaceId.metadata
>;
export type PatchAppsAppIdRulesRuleIdMetadataParam = FromSchema<
  typeof schemas.PatchAppsAppIdRulesRuleId.metadata
>;
export type PatchAppsIdMetadataParam = FromSchema<typeof schemas.PatchAppsId.metadata>;
export type PostAccountsAccountIdAppsMetadataParam = FromSchema<
  typeof schemas.PostAccountsAccountIdApps.metadata
>;
export type PostAppsAppIdKeysKeyIdRevokeMetadataParam = FromSchema<
  typeof schemas.PostAppsAppIdKeysKeyIdRevoke.metadata
>;
export type PostAppsAppIdKeysMetadataParam = FromSchema<typeof schemas.PostAppsAppIdKeys.metadata>;
export type PostAppsAppIdNamespacesMetadataParam = FromSchema<
  typeof schemas.PostAppsAppIdNamespaces.metadata
>;
export type PostAppsAppIdQueuesMetadataParam = FromSchema<
  typeof schemas.PostAppsAppIdQueues.metadata
>;
export type PostAppsAppIdRulesMetadataParam = FromSchema<
  typeof schemas.PostAppsAppIdRules.metadata
>;
export type PostAppsIdPkcs12MetadataParam = FromSchema<typeof schemas.PostAppsIdPkcs12.metadata>;
export type Queue = FromSchema<typeof schemas.Queue>;
export type QueueResponse = FromSchema<typeof schemas.QueueResponse>;
export type RuleAttributes = FromSchema<typeof schemas.RuleAttributes>;
export type RulePatch = FromSchema<typeof schemas.RulePatch>;
export type RulePost = FromSchema<typeof schemas.RulePost>;
export type RuleResponse = FromSchema<typeof schemas.RuleResponse>;
export type RuleSource = FromSchema<typeof schemas.RuleSource>;
export type RuleSourcePatch = FromSchema<typeof schemas.RuleSourcePatch>;
export type UnsupportedRuleResponse = FromSchema<typeof schemas.UnsupportedRuleResponse>;
export type ZapierRulePatch = FromSchema<typeof schemas.ZapierRulePatch>;
export type ZapierRulePost = FromSchema<typeof schemas.ZapierRulePost>;
export type ZapierRuleResponse = FromSchema<typeof schemas.ZapierRuleResponse>;
