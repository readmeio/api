import type * as types from './types';
import type { ConfigOptions, FetchResponse } from '@api/core'
import Oas from 'oas';
import APICore from '@api/core';
import definition from '@api/test-utils/definitions/alby.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'alby/1.0.14 (api/<<package version>>)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * List all applications for the specified account ID.
   *
   * @summary Lists apps
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> Account not found
   * @throws FetchError<500, types.Error> Internal server error
   */
  getAccountsAccount_idApps(metadata: types.GetAccountsAccountIdAppsMetadataParam): Promise<FetchResponse<200, types.GetAccountsAccountIdAppsResponse200>> {
    return this.core.fetch('/accounts/{account_id}/apps', 'get', metadata);
  }

  /**
   * Creates an application with the specified properties.
   *
   * @summary Creates an app
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> Account not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   */
  postAccountsAccount_idApps(body: types.AppPost, metadata: types.PostAccountsAccountIdAppsMetadataParam): Promise<FetchResponse<201, types.AppResponse>> {
    return this.core.fetch('/accounts/{account_id}/apps', 'post', body, metadata);
  }

  /**
   * Lists the API keys associated with the application ID.
   *
   * @summary Lists app keys
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  getAppsApp_idKeys(metadata: types.GetAppsAppIdKeysMetadataParam): Promise<FetchResponse<200, types.GetAppsAppIdKeysResponse200>> {
    return this.core.fetch('/apps/{app_id}/keys', 'get', metadata);
  }

  /**
   * Creates an API key for the application specified.
   *
   * @summary Creates a key
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   */
  postAppsApp_idKeys(body: types.KeyPost, metadata: types.PostAppsAppIdKeysMetadataParam): Promise<FetchResponse<201, types.KeyResponse>> {
    return this.core.fetch('/apps/{app_id}/keys', 'post', body, metadata);
  }

  /**
   * Update the API key with the specified key ID, for the application with the specified
   * application ID.
   *
   * @summary Updates a key
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  patchAppsApp_idKeysKey_id(body: types.KeyPatch, metadata: types.PatchAppsAppIdKeysKeyIdMetadataParam): Promise<FetchResponse<200, types.KeyResponse>>;
  patchAppsApp_idKeysKey_id(metadata: types.PatchAppsAppIdKeysKeyIdMetadataParam): Promise<FetchResponse<200, types.KeyResponse>>;
  patchAppsApp_idKeysKey_id(body?: types.KeyPatch | types.PatchAppsAppIdKeysKeyIdMetadataParam, metadata?: types.PatchAppsAppIdKeysKeyIdMetadataParam): Promise<FetchResponse<200, types.KeyResponse>> {
    return this.core.fetch('/apps/{app_id}/keys/{key_id}', 'patch', body, metadata);
  }

  /**
   * Revokes the API key with the specified ID, with the Application ID. This deletes the
   * key.
   *
   * @summary Revokes a key
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> Not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  postAppsApp_idKeysKey_idRevoke(metadata: types.PostAppsAppIdKeysKeyIdRevokeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/apps/{app_id}/keys/{key_id}/revoke', 'post', metadata);
  }

  /**
   * List the namespaces for the specified application ID.
   *
   * @summary Lists namespaces
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  getAppsApp_idNamespaces(metadata: types.GetAppsAppIdNamespacesMetadataParam): Promise<FetchResponse<200, types.GetAppsAppIdNamespacesResponse200>> {
    return this.core.fetch('/apps/{app_id}/namespaces', 'get', metadata);
  }

  /**
   * Creates a namespace for the specified application ID.
   *
   * @summary Creates a namespace
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   */
  postAppsApp_idNamespaces(body: types.NamespacePost, metadata: types.PostAppsAppIdNamespacesMetadataParam): Promise<FetchResponse<201, types.NamespaceResponse>> {
    return this.core.fetch('/apps/{app_id}/namespaces', 'post', body, metadata);
  }

  /**
   * Deletes the namespace with the specified ID, for the specified application ID.
   *
   * @summary Deletes a namespace
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> Not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  deleteAppsApp_idNamespacesNamespace_id(metadata: types.DeleteAppsAppIdNamespacesNamespaceIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/apps/{app_id}/namespaces/{namespace_id}', 'delete', metadata);
  }

  /**
   * Updates the namespace with the specified ID, for the application with the specified
   * application ID.
   *
   * @summary Updates a namespace
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> Not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  patchAppsApp_idNamespacesNamespace_id(body: types.NamespacePatch, metadata: types.PatchAppsAppIdNamespacesNamespaceIdMetadataParam): Promise<FetchResponse<200, types.NamespaceResponse>>;
  patchAppsApp_idNamespacesNamespace_id(metadata: types.PatchAppsAppIdNamespacesNamespaceIdMetadataParam): Promise<FetchResponse<200, types.NamespaceResponse>>;
  patchAppsApp_idNamespacesNamespace_id(body?: types.NamespacePatch | types.PatchAppsAppIdNamespacesNamespaceIdMetadataParam, metadata?: types.PatchAppsAppIdNamespacesNamespaceIdMetadataParam): Promise<FetchResponse<200, types.NamespaceResponse>> {
    return this.core.fetch('/apps/{app_id}/namespaces/{namespace_id}', 'patch', body, metadata);
  }

  /**
   * Lists the queues associated with the specified application ID.
   *
   * @summary Lists queues
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<503, types.Error> 503 Service unavailable
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  getAppsApp_idQueues(metadata: types.GetAppsAppIdQueuesMetadataParam): Promise<FetchResponse<200, types.GetAppsAppIdQueuesResponse200>> {
    return this.core.fetch('/apps/{app_id}/queues', 'get', metadata);
  }

  /**
   * Creates a queue for the application specified by application ID. The properties for the
   * queue to be created are specified in the request body.
   *
   * @summary Creates a queue
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   */
  postAppsApp_idQueues(body: types.Queue, metadata: types.PostAppsAppIdQueuesMetadataParam): Promise<FetchResponse<201, types.QueueResponse>> {
    return this.core.fetch('/apps/{app_id}/queues', 'post', body, metadata);
  }

  /**
   * Delete the queue with the specified queue name, from the application with the specified
   * application ID.
   *
   * @summary Deletes a queue
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<503, types.Error> 503 Service unavailable
   */
  deleteAppsApp_idQueuesQueue_id(metadata: types.DeleteAppsAppIdQueuesQueueIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/apps/{app_id}/queues/{queue_id}', 'delete', metadata);
  }

  /**
   * Lists the rules for the application specified by the application ID.
   *
   * @summary Lists Reactor rules
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  getAppsApp_idRules(metadata: types.GetAppsAppIdRulesMetadataParam): Promise<FetchResponse<200, types.GetAppsAppIdRulesResponse200>> {
    return this.core.fetch('/apps/{app_id}/rules', 'get', metadata);
  }

  /**
   * Creates a rule for the application with the specified application ID.
   *
   * @summary Creates a Reactor rule
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  postAppsApp_idRules(body: types.RulePost, metadata: types.PostAppsAppIdRulesMetadataParam): Promise<FetchResponse<201, types.RuleResponse>>;
  postAppsApp_idRules(metadata: types.PostAppsAppIdRulesMetadataParam): Promise<FetchResponse<201, types.RuleResponse>>;
  postAppsApp_idRules(body?: types.RulePost | types.PostAppsAppIdRulesMetadataParam, metadata?: types.PostAppsAppIdRulesMetadataParam): Promise<FetchResponse<201, types.RuleResponse>> {
    return this.core.fetch('/apps/{app_id}/rules', 'post', body, metadata);
  }

  /**
   * Deletes a Reactor rule
   *
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  deleteAppsApp_idRulesRule_id(metadata: types.DeleteAppsAppIdRulesRuleIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/apps/{app_id}/rules/{rule_id}', 'delete', metadata);
  }

  /**
   * Returns the rule specified by the rule ID, for the application specified by application
   * ID.
   *
   * @summary Gets a reactor rule by rule ID
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> Not found
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  getAppsApp_idRulesRule_id(metadata: types.GetAppsAppIdRulesRuleIdMetadataParam): Promise<FetchResponse<200, types.RuleResponse>> {
    return this.core.fetch('/apps/{app_id}/rules/{rule_id}', 'get', metadata);
  }

  /**
   * Updates a Reactor rule
   *
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   * @throws FetchError<504, types.Error> Gateway timeout
   */
  patchAppsApp_idRulesRule_id(body: types.RulePatch, metadata: types.PatchAppsAppIdRulesRuleIdMetadataParam): Promise<FetchResponse<200, types.RuleResponse>>;
  patchAppsApp_idRulesRule_id(metadata: types.PatchAppsAppIdRulesRuleIdMetadataParam): Promise<FetchResponse<200, types.RuleResponse>>;
  patchAppsApp_idRulesRule_id(body?: types.RulePatch | types.PatchAppsAppIdRulesRuleIdMetadataParam, metadata?: types.PatchAppsAppIdRulesRuleIdMetadataParam): Promise<FetchResponse<200, types.RuleResponse>> {
    return this.core.fetch('/apps/{app_id}/rules/{rule_id}', 'patch', body, metadata);
  }

  /**
   * Deletes the application with the specified application ID.
   *
   * @summary Deletes an app
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<422, types.Error> Invalid request
   * @throws FetchError<500, types.Error> Internal server error
   */
  deleteAppsId(metadata: types.DeleteAppsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/apps/{id}', 'delete', metadata);
  }

  /**
   * Updates the application with the specified application ID.
   *
   * @summary Updates an app
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   */
  patchAppsId(body: types.AppPatch, metadata: types.PatchAppsIdMetadataParam): Promise<FetchResponse<200, types.AppResponse>>;
  patchAppsId(metadata: types.PatchAppsIdMetadataParam): Promise<FetchResponse<200, types.AppResponse>>;
  patchAppsId(body?: types.AppPatch | types.PatchAppsIdMetadataParam, metadata?: types.PatchAppsIdMetadataParam): Promise<FetchResponse<200, types.AppResponse>> {
    return this.core.fetch('/apps/{id}', 'patch', body, metadata);
  }

  /**
   * Updates the application's Apple Push Notification service (APNs) information.
   *
   * @summary Updates app's APNs info from a `.p12` file
   * @throws FetchError<400, types.Error> Bad request
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<404, types.Error> App not found
   * @throws FetchError<500, types.Error> Internal server error
   */
  postAppsIdPkcs12(body: types.AppPkcs12, metadata: types.PostAppsIdPkcs12MetadataParam): Promise<FetchResponse<200, types.AppResponse>> {
    return this.core.fetch('/apps/{id}/pkcs12', 'post', body, metadata);
  }

  /**
   * Get token details
   *
   * @throws FetchError<401, types.Error> Authentication failed
   * @throws FetchError<500, types.Error> Internal server error
   */
  getMe(): Promise<FetchResponse<200, types.Me>> {
    return this.core.fetch('/me', 'get');
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AmqpExternalRulePatch, AmqpExternalRulePost, AmqpExternalRuleResponse, AmqpRulePatch, AmqpRulePost, AmqpRuleResponse, AppPatch, AppPkcs12, AppPost, AppResponse, AwsAccessKeys, AwsAccessKeysResponse, AwsAssumeRole, AwsKinesisRulePatch, AwsKinesisRulePost, AwsKinesisRuleResponse, AwsLambdaRulePatch, AwsLambdaRulePost, AwsLambdaRuleResponse, AwsSqsRulePatch, AwsSqsRulePost, AwsSqsRuleResponse, AzureFunctionRulePatch, AzureFunctionRulePost, AzureFunctionRuleResponse, CloudflareWorkerRulePatch, CloudflareWorkerRulePost, CloudflareWorkerRuleResponse, DeleteAppsAppIdNamespacesNamespaceIdMetadataParam, DeleteAppsAppIdQueuesQueueIdMetadataParam, DeleteAppsAppIdRulesRuleIdMetadataParam, DeleteAppsIdMetadataParam, Error, GetAccountsAccountIdAppsMetadataParam, GetAccountsAccountIdAppsResponse200, GetAppsAppIdKeysMetadataParam, GetAppsAppIdKeysResponse200, GetAppsAppIdNamespacesMetadataParam, GetAppsAppIdNamespacesResponse200, GetAppsAppIdQueuesMetadataParam, GetAppsAppIdQueuesResponse200, GetAppsAppIdRulesMetadataParam, GetAppsAppIdRulesResponse200, GetAppsAppIdRulesRuleIdMetadataParam, GoogleCloudFunctionRulePatch, GoogleCloudFunctionRulePost, GoogleCloudFunctionRuleResponse, HttpRulePatch, HttpRulePost, HttpRuleResponse, IftttRulePatch, IftttRulePost, IftttRuleResponse, KeyPatch, KeyPost, KeyResponse, Me, NamespacePatch, NamespacePost, NamespaceResponse, PatchAppsAppIdKeysKeyIdMetadataParam, PatchAppsAppIdNamespacesNamespaceIdMetadataParam, PatchAppsAppIdRulesRuleIdMetadataParam, PatchAppsIdMetadataParam, PostAccountsAccountIdAppsMetadataParam, PostAppsAppIdKeysKeyIdRevokeMetadataParam, PostAppsAppIdKeysMetadataParam, PostAppsAppIdNamespacesMetadataParam, PostAppsAppIdQueuesMetadataParam, PostAppsAppIdRulesMetadataParam, PostAppsIdPkcs12MetadataParam, Queue, QueueResponse, RulePatch, RulePost, RuleResponse, RuleSource, UnsupportedRuleResponse, ZapierRulePatch, ZapierRulePost, ZapierRuleResponse } from './types';
