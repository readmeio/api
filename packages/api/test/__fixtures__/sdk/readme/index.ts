import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '@readme/oas-examples/3.0/json/readme.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'readme/2.0.0 (api/<<package version>>)');
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
   * Get an API definition file that's been uploaded to ReadMe.
   *
   * @summary Retrieve an entry from the API Registry
   */
  getAPIRegistry(
    metadata: types.GetApiRegistryMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetApiRegistryResponse200>
    | FetchResponse<404, types.ErrorRegistryNotfound>
  > {
    return this.core.fetch('/api-registry/{uuid}', 'get', metadata);
  }

  /**
   * Get API specification metadata.
   *
   * @summary Get metadata
   */
  getAPISpecification(
    metadata?: types.GetApiSpecificationMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetApiSpecificationResponse200>
    | FetchResponse<400, types.ErrorVersionEmpty>
    | FetchResponse<401, types.GetApiSpecificationResponse401>
    | FetchResponse<403, types.GetApiSpecificationResponse403>
    | FetchResponse<404, types.ErrorVersionNotfound>
  > {
    return this.core.fetch('/api-specification', 'get', metadata);
  }

  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see
   * https://docs.readme.com/docs/automatically-sync-api-specification-with-github.
   *
   * @summary Upload specification
   */
  uploadAPISpecification(
    body: types.UploadApiSpecificationBodyParam,
    metadata?: types.UploadApiSpecificationMetadataParam
  ): Promise<
    | FetchResponse<400, types.UploadApiSpecificationResponse400>
    | FetchResponse<401, types.UploadApiSpecificationResponse401>
    | FetchResponse<403, types.UploadApiSpecificationResponse403>
    | FetchResponse<408, types.ErrorSpecTimeout>
  > {
    return this.core.fetch('/api-specification', 'post', body, metadata);
  }

  /**
   * Update an API specification in ReadMe.
   *
   * @summary Update specification
   */
  updateAPISpecification(
    body: types.UpdateApiSpecificationBodyParam,
    metadata: types.UpdateApiSpecificationMetadataParam
  ): Promise<
    | FetchResponse<400, types.UpdateApiSpecificationResponse400>
    | FetchResponse<401, types.UpdateApiSpecificationResponse401>
    | FetchResponse<403, types.UpdateApiSpecificationResponse403>
    | FetchResponse<408, types.ErrorSpecTimeout>
  > {
    return this.core.fetch('/api-specification/{id}', 'put', body, metadata);
  }

  /**
   * Delete an API specification in ReadMe.
   *
   * @summary Delete specification
   */
  deleteAPISpecification(
    metadata: types.DeleteApiSpecificationMetadataParam
  ): Promise<
    | FetchResponse<400, types.ErrorSpecIdInvalid>
    | FetchResponse<401, types.DeleteApiSpecificationResponse401>
    | FetchResponse<403, types.DeleteApiSpecificationResponse403>
    | FetchResponse<404, types.ErrorSpecNotfound>
  > {
    return this.core.fetch('/api-specification/{id}', 'delete', metadata);
  }

  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  getOpenRoles(): Promise<FetchResponse<200, types.GetOpenRolesResponse200>> {
    return this.core.fetch('/apply', 'get');
  }

  /**
   * This endpoint will let you apply to a job at ReadMe programatically, without having to
   * go through our UI!
   *
   * @summary Submit your application!
   */
  applyToReadMe(body: types.Apply): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/apply', 'post', body);
  }

  /**
   * Returns all the categories for a specified version.
   *
   * @summary Get all categories
   */
  getCategories(
    metadata?: types.GetCategoriesMetadataParam
  ): Promise<FetchResponse<200, types.GetCategoriesResponse200>> {
    return this.core.fetch('/categories', 'get', metadata);
  }

  /**
   * Create a new category inside of this project.
   *
   * @summary Create category
   */
  createCategory(
    body: types.Category,
    metadata?: types.CreateCategoryMetadataParam
  ): Promise<FetchResponse<400, types.ErrorCategoryInvalid>> {
    return this.core.fetch('/categories', 'post', body, metadata);
  }

  /**
   * Returns the category with this slug.
   *
   * @summary Get category
   */
  getCategory(
    metadata: types.GetCategoryMetadataParam
  ): Promise<FetchResponse<404, types.ErrorCategoryNotfound>> {
    return this.core.fetch('/categories/{slug}', 'get', metadata);
  }

  /**
   * Change the properties of a category.
   *
   * @summary Update category
   */
  updateCategory(
    body: types.Category,
    metadata: types.UpdateCategoryMetadataParam
  ): Promise<
    FetchResponse<400, types.ErrorCategoryInvalid> | FetchResponse<404, types.ErrorCategoryNotfound>
  > {
    return this.core.fetch('/categories/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   */
  deleteCategory(
    metadata: types.DeleteCategoryMetadataParam
  ): Promise<FetchResponse<404, types.ErrorCategoryNotfound>> {
    return this.core.fetch('/categories/{slug}', 'delete', metadata);
  }

  /**
   * Returns the docs and children docs within this category.
   *
   * @summary Get docs for category
   */
  getCategoryDocs(
    metadata: types.GetCategoryDocsMetadataParam
  ): Promise<FetchResponse<404, types.ErrorCategoryNotfound>> {
    return this.core.fetch('/categories/{slug}/docs', 'get', metadata);
  }

  /**
   * Returns a list of changelogs.
   *
   * @summary Get changelogs
   */
  getChangelogs(
    metadata?: types.GetChangelogsMetadataParam
  ): Promise<FetchResponse<200, types.GetChangelogsResponse200>> {
    return this.core.fetch('/changelogs', 'get', metadata);
  }

  /**
   * Create a new changelog entry.
   *
   * @summary Create changelog
   */
  createChangelog(body: types.Changelog): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/changelogs', 'post', body);
  }

  /**
   * Returns the changelog with this slug.
   *
   * @summary Get changelog
   */
  getChangelog(metadata: types.GetChangelogMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/changelogs/{slug}', 'get', metadata);
  }

  /**
   * Update a changelog with this slug.
   *
   * @summary Update changelog
   */
  updateChangelog(
    body: types.Changelog,
    metadata: types.UpdateChangelogMetadataParam
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/changelogs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the changelog with this slug.
   *
   * @summary Delete changelog
   */
  deleteChangelog(
    metadata: types.DeleteChangelogMetadataParam
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/changelogs/{slug}', 'delete', metadata);
  }

  /**
   * Returns a list of custom pages.
   *
   * @summary Get custom pages
   */
  getCustomPages(
    metadata?: types.GetCustomPagesMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetCustomPagesResponse200>
    | FetchResponse<401, types.GetCustomPagesResponse401>
    | FetchResponse<403, types.GetCustomPagesResponse403>
  > {
    return this.core.fetch('/custompages', 'get', metadata);
  }

  /**
   * Create a new custom page inside of this project.
   *
   * @summary Create custom page
   */
  createCustomPage(
    body: types.CustomPage
  ): Promise<
    | FetchResponse<400, types.ErrorCustompageInvalid>
    | FetchResponse<401, types.CreateCustomPageResponse401>
    | FetchResponse<403, types.CreateCustomPageResponse403>
  > {
    return this.core.fetch('/custompages', 'post', body);
  }

  /**
   * Returns the custom page with this slug.
   *
   * @summary Get custom page
   */
  getCustomPage(
    metadata: types.GetCustomPageMetadataParam
  ): Promise<
    | FetchResponse<401, types.GetCustomPageResponse401>
    | FetchResponse<403, types.GetCustomPageResponse403>
    | FetchResponse<404, types.ErrorCustompageNotfound>
  > {
    return this.core.fetch('/custompages/{slug}', 'get', metadata);
  }

  /**
   * Update a custom page with this slug.
   *
   * @summary Update custom page
   */
  updateCustomPage(
    body: types.CustomPage,
    metadata: types.UpdateCustomPageMetadataParam
  ): Promise<
    | FetchResponse<400, types.ErrorCustompageInvalid>
    | FetchResponse<401, types.UpdateCustomPageResponse401>
    | FetchResponse<403, types.UpdateCustomPageResponse403>
    | FetchResponse<404, types.ErrorCustompageNotfound>
  > {
    return this.core.fetch('/custompages/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the custom page with this slug.
   *
   * @summary Delete custom page
   */
  deleteCustomPage(
    metadata: types.DeleteCustomPageMetadataParam
  ): Promise<
    | FetchResponse<401, types.DeleteCustomPageResponse401>
    | FetchResponse<403, types.DeleteCustomPageResponse403>
    | FetchResponse<404, types.ErrorCustompageNotfound>
  > {
    return this.core.fetch('/custompages/{slug}', 'delete', metadata);
  }

  /**
   * Returns the doc with this slug.
   *
   * @summary Get doc
   */
  getDoc(
    metadata: types.GetDocMetadataParam
  ): Promise<
    | FetchResponse<401, types.GetDocResponse401>
    | FetchResponse<403, types.GetDocResponse403>
    | FetchResponse<404, types.ErrorDocNotfound>
  > {
    return this.core.fetch('/docs/{slug}', 'get', metadata);
  }

  /**
   * Update a doc with this slug.
   *
   * @summary Update doc
   */
  updateDoc(
    body: types.Doc,
    metadata: types.UpdateDocMetadataParam
  ): Promise<
    | FetchResponse<400, types.ErrorDocInvalid>
    | FetchResponse<401, types.UpdateDocResponse401>
    | FetchResponse<403, types.UpdateDocResponse403>
    | FetchResponse<404, types.ErrorDocNotfound>
  > {
    return this.core.fetch('/docs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the doc with this slug.
   *
   * @summary Delete doc
   */
  deleteDoc(
    metadata: types.DeleteDocMetadataParam
  ): Promise<
    | FetchResponse<401, types.DeleteDocResponse401>
    | FetchResponse<403, types.DeleteDocResponse403>
    | FetchResponse<404, types.ErrorDocNotfound>
  > {
    return this.core.fetch('/docs/{slug}', 'delete', metadata);
  }

  /**
   * This is intended for use by enterprise users with staging enabled. This endpoint will
   * return the live version of your document, whereas the standard endpoint will always
   * return staging.
   *
   * @summary Get production doc
   */
  getProductionDoc(
    metadata: types.GetProductionDocMetadataParam
  ): Promise<
    | FetchResponse<401, types.GetProductionDocResponse401>
    | FetchResponse<403, types.GetProductionDocResponse403>
    | FetchResponse<404, types.ErrorDocNotfound>
  > {
    return this.core.fetch('/docs/{slug}/production', 'get', metadata);
  }

  /**
   * Create a new doc inside of this project.
   *
   * @summary Create doc
   */
  createDoc(
    body: types.Doc,
    metadata?: types.CreateDocMetadataParam
  ): Promise<
    | FetchResponse<400, types.ErrorDocInvalid>
    | FetchResponse<401, types.CreateDocResponse401>
    | FetchResponse<403, types.CreateDocResponse403>
  > {
    return this.core.fetch('/docs', 'post', body, metadata);
  }

  /**
   * Returns all docs that match the search.
   *
   * @summary Search docs
   */
  searchDocs(
    metadata: types.SearchDocsMetadataParam
  ): Promise<
    | FetchResponse<401, types.SearchDocsResponse401>
    | FetchResponse<403, types.SearchDocsResponse403>
  > {
    return this.core.fetch('/docs/search', 'post', metadata);
  }

  /**
   * Returns with all of the error page types for this project.
   *
   * @summary Get errors
   */
  getErrors(): Promise<
    FetchResponse<401, types.GetErrorsResponse401> | FetchResponse<403, types.GetErrorsResponse403>
  > {
    return this.core.fetch('/errors', 'get');
  }

  /**
   * Returns project data for the API key.
   *
   * @summary Get metadata about the current project
   */
  getProject(): Promise<
    | FetchResponse<200, types.CondensedProjectData>
    | FetchResponse<401, types.GetProjectResponse401>
    | FetchResponse<403, types.GetProjectResponse403>
  > {
    return this.core.fetch('/', 'get');
  }

  /**
   * Retrieve a list of versions associated with a project API key.
   *
   * @summary Get versions
   */
  getVersions(): Promise<
    | FetchResponse<401, types.GetVersionsResponse401>
    | FetchResponse<403, types.GetVersionsResponse403>
  > {
    return this.core.fetch('/version', 'get');
  }

  /**
   * Create a new version.
   *
   * @summary Create version
   */
  createVersion(
    body: types.Version
  ): Promise<
    | FetchResponse<400, types.CreateVersionResponse400>
    | FetchResponse<401, types.CreateVersionResponse401>
    | FetchResponse<403, types.CreateVersionResponse403>
    | FetchResponse<404, types.ErrorVersionForkNotfound>
  > {
    return this.core.fetch('/version', 'post', body);
  }

  /**
   * Returns the version with this version ID.
   *
   * @summary Get version
   */
  getVersion(
    metadata: types.GetVersionMetadataParam
  ): Promise<
    | FetchResponse<401, types.GetVersionResponse401>
    | FetchResponse<403, types.GetVersionResponse403>
    | FetchResponse<404, types.ErrorVersionNotfound>
  > {
    return this.core.fetch('/version/{versionId}', 'get', metadata);
  }

  /**
   * Update an existing version.
   *
   * @summary Update version
   */
  updateVersion(
    body: types.Version,
    metadata: types.UpdateVersionMetadataParam
  ): Promise<
    | FetchResponse<400, types.ErrorVersionCantDemoteStable>
    | FetchResponse<401, types.UpdateVersionResponse401>
    | FetchResponse<403, types.UpdateVersionResponse403>
    | FetchResponse<404, types.ErrorVersionNotfound>
  > {
    return this.core.fetch('/version/{versionId}', 'put', body, metadata);
  }

  /**
   * Delete a version
   *
   * @summary Delete version
   */
  deleteVersion(
    metadata: types.DeleteVersionMetadataParam
  ): Promise<
    | FetchResponse<400, types.ErrorVersionCantRemoveStable>
    | FetchResponse<401, types.DeleteVersionResponse401>
    | FetchResponse<403, types.DeleteVersionResponse403>
    | FetchResponse<404, types.ErrorVersionNotfound>
  > {
    return this.core.fetch('/version/{versionId}', 'delete', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  Apply,
  BaseError,
  Category,
  Changelog,
  CondensedProjectData,
  CreateCategoryMetadataParam,
  CreateCustomPageResponse401,
  CreateCustomPageResponse403,
  CreateDocMetadataParam,
  CreateDocResponse401,
  CreateDocResponse403,
  CreateVersionResponse400,
  CreateVersionResponse401,
  CreateVersionResponse403,
  CustomPage,
  DeleteApiSpecificationMetadataParam,
  DeleteApiSpecificationResponse401,
  DeleteApiSpecificationResponse403,
  DeleteCategoryMetadataParam,
  DeleteChangelogMetadataParam,
  DeleteCustomPageMetadataParam,
  DeleteCustomPageResponse401,
  DeleteCustomPageResponse403,
  DeleteDocMetadataParam,
  DeleteDocResponse401,
  DeleteDocResponse403,
  DeleteVersionMetadataParam,
  DeleteVersionResponse401,
  DeleteVersionResponse403,
  Doc,
  ErrorApikeyEmpty,
  ErrorApikeyMismatch,
  ErrorApikeyNotfound,
  ErrorApplyInvalidEmail,
  ErrorApplyInvalidJob,
  ErrorApplyInvalidName,
  ErrorCategoryInvalid,
  ErrorCategoryNotfound,
  ErrorChangelogInvalid,
  ErrorChangelogNotfound,
  ErrorCustompageInvalid,
  ErrorCustompageNotfound,
  ErrorDocInvalid,
  ErrorDocNotfound,
  ErrorEndpointNotfound,
  ErrorInternalError,
  ErrorProjectNeedsstaging,
  ErrorProjectNotfound,
  ErrorRegistryInvalid,
  ErrorRegistryNotfound,
  ErrorSpecFileEmpty,
  ErrorSpecIdDuplicate,
  ErrorSpecIdInvalid,
  ErrorSpecInvalid,
  ErrorSpecInvalidSchema,
  ErrorSpecNotfound,
  ErrorSpecTimeout,
  ErrorSpecVersionNotfound,
  ErrorUnexpectedError,
  ErrorVersionCantDemoteStable,
  ErrorVersionCantRemoveStable,
  ErrorVersionDuplicate,
  ErrorVersionEmpty,
  ErrorVersionForkEmpty,
  ErrorVersionForkNotfound,
  ErrorVersionInvalid,
  ErrorVersionNotfound,
  GetApiRegistryMetadataParam,
  GetApiRegistryResponse200,
  GetApiSpecificationMetadataParam,
  GetApiSpecificationResponse200,
  GetApiSpecificationResponse401,
  GetApiSpecificationResponse403,
  GetCategoriesMetadataParam,
  GetCategoriesResponse200,
  GetCategoryDocsMetadataParam,
  GetCategoryMetadataParam,
  GetChangelogMetadataParam,
  GetChangelogsMetadataParam,
  GetChangelogsResponse200,
  GetCustomPageMetadataParam,
  GetCustomPageResponse401,
  GetCustomPageResponse403,
  GetCustomPagesMetadataParam,
  GetCustomPagesResponse200,
  GetCustomPagesResponse401,
  GetCustomPagesResponse403,
  GetDocMetadataParam,
  GetDocResponse401,
  GetDocResponse403,
  GetErrorsResponse401,
  GetErrorsResponse403,
  GetOpenRolesResponse200,
  GetProductionDocMetadataParam,
  GetProductionDocResponse401,
  GetProductionDocResponse403,
  GetProjectResponse401,
  GetProjectResponse403,
  GetVersionMetadataParam,
  GetVersionResponse401,
  GetVersionResponse403,
  GetVersionsResponse401,
  GetVersionsResponse403,
  JobOpening,
  SearchDocsMetadataParam,
  SearchDocsResponse401,
  SearchDocsResponse403,
  UpdateApiSpecificationBodyParam,
  UpdateApiSpecificationMetadataParam,
  UpdateApiSpecificationResponse400,
  UpdateApiSpecificationResponse401,
  UpdateApiSpecificationResponse403,
  UpdateCategoryMetadataParam,
  UpdateChangelogMetadataParam,
  UpdateCustomPageMetadataParam,
  UpdateCustomPageResponse401,
  UpdateCustomPageResponse403,
  UpdateDocMetadataParam,
  UpdateDocResponse401,
  UpdateDocResponse403,
  UpdateVersionMetadataParam,
  UpdateVersionResponse401,
  UpdateVersionResponse403,
  UploadApiSpecificationBodyParam,
  UploadApiSpecificationMetadataParam,
  UploadApiSpecificationResponse400,
  UploadApiSpecificationResponse401,
  UploadApiSpecificationResponse403,
  Version,
} from './types';
