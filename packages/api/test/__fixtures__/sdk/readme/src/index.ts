import type * as types from './types';
import type { ConfigOptions, FetchResponse } from '@readme/api-core';
import APICore from '@readme/api-core';
import definition from '@readme/oas-examples/3.0/json/readme.json';

class SDK {
  core: APICore;

  constructor() {
    this.core = new APICore(definition, 'readme/4.355.0 (api/<<package version>>)');
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
   * @throws FetchError<404, types.ErrorRegistryNotfound> The registry entry couldn't be found.
   */
  getAPIRegistry(metadata: types.GetApiRegistryMetadataParam): Promise<FetchResponse<200, types.GetApiRegistryResponse200>> {
    return this.core.fetch('/api-registry/{uuid}', 'get', metadata);
  }

  /**
   * Get API specification metadata.
   *
   * @summary Get metadata
   * @throws FetchError<400, types.ErrorVersionEmpty> No version was supplied.
   * @throws FetchError<401, types.GetApiSpecificationResponse401> Unauthorized
   * @throws FetchError<403, types.GetApiSpecificationResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorVersionNotfound> The version couldn't be found.
   */
  getAPISpecification(metadata?: types.GetApiSpecificationMetadataParam): Promise<FetchResponse<200, types.GetApiSpecificationResponse200>> {
    return this.core.fetch('/api-specification', 'get', metadata);
  }

  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see
   * https://docs.readme.com/main/docs/rdme.
   *
   * @summary Upload specification
   * @throws FetchError<400, types.UploadApiSpecificationResponse400> There was a validation error during upload.
   * @throws FetchError<401, types.UploadApiSpecificationResponse401> Unauthorized
   * @throws FetchError<403, types.UploadApiSpecificationResponse403> Unauthorized
   * @throws FetchError<408, types.ErrorSpecTimeout> The spec upload timed out.
   */
  uploadAPISpecification(body: types.UploadApiSpecificationBodyParam, metadata?: types.UploadApiSpecificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api-specification', 'post', body, metadata);
  }

  /**
   * Update an API specification in ReadMe.
   *
   * @summary Update specification
   * @throws FetchError<400, types.UpdateApiSpecificationResponse400> There was a validation error during upload.
   * @throws FetchError<401, types.UpdateApiSpecificationResponse401> Unauthorized
   * @throws FetchError<403, types.UpdateApiSpecificationResponse403> Unauthorized
   * @throws FetchError<408, types.ErrorSpecTimeout> The spec upload timed out.
   */
  updateAPISpecification(body: types.UpdateApiSpecificationBodyParam, metadata: types.UpdateApiSpecificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/api-specification/{id}', 'put', body, metadata);
  }

  /**
   * Delete an API specification in ReadMe.
   *
   * @summary Delete specification
   * @throws FetchError<400, types.ErrorSpecIdInvalid> The spec ID isn't valid.
   * @throws FetchError<401, types.DeleteApiSpecificationResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteApiSpecificationResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorSpecNotfound> The spec couldn't be found.
   */
  deleteAPISpecification(metadata: types.DeleteApiSpecificationMetadataParam): Promise<FetchResponse<number, unknown>> {
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
  getCategories(metadata?: types.GetCategoriesMetadataParam): Promise<FetchResponse<200, types.GetCategoriesResponse200>> {
    return this.core.fetch('/categories', 'get', metadata);
  }

  /**
   * Create a new category inside of this project.
   *
   * @summary Create category
   * @throws FetchError<400, types.ErrorCategoryInvalid> The category couldn't be saved.
   */
  createCategory(body: types.Category, metadata?: types.CreateCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/categories', 'post', body, metadata);
  }

  /**
   * Returns the category with this slug.
   *
   * @summary Get category
   * @throws FetchError<404, types.ErrorCategoryNotfound> The category couldn't be found.
   */
  getCategory(metadata: types.GetCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/categories/{slug}', 'get', metadata);
  }

  /**
   * Change the properties of a category.
   *
   * @summary Update category
   * @throws FetchError<400, types.ErrorCategoryInvalid> The category couldn't be saved.
   * @throws FetchError<404, types.ErrorCategoryNotfound> The category couldn't be found.
   */
  updateCategory(body: types.Category, metadata: types.UpdateCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/categories/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   * @throws FetchError<404, types.ErrorCategoryNotfound> The category couldn't be found.
   */
  deleteCategory(metadata: types.DeleteCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/categories/{slug}', 'delete', metadata);
  }

  /**
   * Returns the docs and children docs within this category.
   *
   * @summary Get docs for category
   * @throws FetchError<404, types.ErrorCategoryNotfound> The category couldn't be found.
   */
  getCategoryDocs(metadata: types.GetCategoryDocsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/categories/{slug}/docs', 'get', metadata);
  }

  /**
   * Returns a list of changelogs.
   *
   * @summary Get changelogs
   */
  getChangelogs(metadata?: types.GetChangelogsMetadataParam): Promise<FetchResponse<200, types.GetChangelogsResponse200>> {
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
  updateChangelog(body: types.Changelog, metadata: types.UpdateChangelogMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/changelogs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the changelog with this slug.
   *
   * @summary Delete changelog
   */
  deleteChangelog(metadata: types.DeleteChangelogMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/changelogs/{slug}', 'delete', metadata);
  }

  /**
   * Returns a list of custom pages.
   *
   * @summary Get custom pages
   * @throws FetchError<401, types.GetCustomPagesResponse401> Unauthorized
   * @throws FetchError<403, types.GetCustomPagesResponse403> Unauthorized
   */
  getCustomPages(metadata?: types.GetCustomPagesMetadataParam): Promise<FetchResponse<200, types.GetCustomPagesResponse200>> {
    return this.core.fetch('/custompages', 'get', metadata);
  }

  /**
   * Create a new custom page inside of this project.
   *
   * @summary Create custom page
   * @throws FetchError<400, types.ErrorCustompageInvalid> The page couldn't be saved.
   * @throws FetchError<401, types.CreateCustomPageResponse401> Unauthorized
   * @throws FetchError<403, types.CreateCustomPageResponse403> Unauthorized
   */
  createCustomPage(body: types.CustomPage): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custompages', 'post', body);
  }

  /**
   * Returns the custom page with this slug.
   *
   * @summary Get custom page
   * @throws FetchError<401, types.GetCustomPageResponse401> Unauthorized
   * @throws FetchError<403, types.GetCustomPageResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorCustompageNotfound> The custom page couldn't be found.
   */
  getCustomPage(metadata: types.GetCustomPageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custompages/{slug}', 'get', metadata);
  }

  /**
   * Update a custom page with this slug.
   *
   * @summary Update custom page
   * @throws FetchError<400, types.ErrorCustompageInvalid> The page couldn't be saved.
   * @throws FetchError<401, types.UpdateCustomPageResponse401> Unauthorized
   * @throws FetchError<403, types.UpdateCustomPageResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorCustompageNotfound> The custom page couldn't be found.
   */
  updateCustomPage(body: types.CustomPage, metadata: types.UpdateCustomPageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custompages/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the custom page with this slug.
   *
   * @summary Delete custom page
   * @throws FetchError<401, types.DeleteCustomPageResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteCustomPageResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorCustompageNotfound> The custom page couldn't be found.
   */
  deleteCustomPage(metadata: types.DeleteCustomPageMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custompages/{slug}', 'delete', metadata);
  }

  /**
   * Returns the doc with this slug.
   *
   * @summary Get doc
   * @throws FetchError<401, types.GetDocResponse401> Unauthorized
   * @throws FetchError<403, types.GetDocResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorDocNotfound> The doc couldn't be found.
   */
  getDoc(metadata: types.GetDocMetadataParam): Promise<FetchResponse<200, types.DocSchemaResponse>> {
    return this.core.fetch('/docs/{slug}', 'get', metadata);
  }

  /**
   * Update a doc with this slug.
   *
   * @summary Update doc
   * @throws FetchError<400, types.ErrorDocInvalid> The doc couldn't be saved.
   * @throws FetchError<401, types.UpdateDocResponse401> Unauthorized
   * @throws FetchError<403, types.UpdateDocResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorDocNotfound> The doc couldn't be found.
   */
  updateDoc(body: types.DocSchemaPut, metadata: types.UpdateDocMetadataParam): Promise<FetchResponse<200, types.DocSchemaResponse>> {
    return this.core.fetch('/docs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the doc with this slug.
   *
   * @summary Delete doc
   * @throws FetchError<401, types.DeleteDocResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteDocResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorDocNotfound> The doc couldn't be found.
   */
  deleteDoc(metadata: types.DeleteDocMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/docs/{slug}', 'delete', metadata);
  }

  /**
   * This is intended for use by enterprise users with staging enabled. This endpoint will
   * return the live version of your document, whereas the standard endpoint will always
   * return staging.
   *
   * @summary Get production doc
   * @throws FetchError<401, types.GetProductionDocResponse401> Unauthorized
   * @throws FetchError<403, types.GetProductionDocResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorDocNotfound> The doc couldn't be found.
   */
  getProductionDoc(metadata: types.GetProductionDocMetadataParam): Promise<FetchResponse<200, types.DocSchemaResponse>> {
    return this.core.fetch('/docs/{slug}/production', 'get', metadata);
  }

  /**
   * Create a new doc inside of this project.
   *
   * @summary Create doc
   * @throws FetchError<400, types.ErrorDocInvalid> The doc couldn't be saved.
   * @throws FetchError<401, types.CreateDocResponse401> Unauthorized
   * @throws FetchError<403, types.CreateDocResponse403> Unauthorized
   */
  createDoc(body: types.DocSchemaPost, metadata?: types.CreateDocMetadataParam): Promise<FetchResponse<201, types.DocSchemaResponse>> {
    return this.core.fetch('/docs', 'post', body, metadata);
  }

  /**
   * Returns all docs that match the search.
   *
   * @summary Search docs
   * @throws FetchError<401, types.SearchDocsResponse401> Unauthorized
   * @throws FetchError<403, types.SearchDocsResponse403> Unauthorized
   */
  searchDocs(metadata: types.SearchDocsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/docs/search', 'post', metadata);
  }

  /**
   * Returns project data for the API key.
   *
   * @summary Get metadata about the current project
   * @throws FetchError<401, types.GetProjectResponse401> Unauthorized
   * @throws FetchError<403, types.GetProjectResponse403> Unauthorized
   */
  getProject(): Promise<FetchResponse<200, types.CondensedProjectData>> {
    return this.core.fetch('/', 'get');
  }

  /**
   * Returns a copy of our OpenAPI Definition.
   *
   * @summary Get our OpenAPI Definition
   */
  getAPISchema(): Promise<FetchResponse<200, types.GetApiSchemaResponse200>> {
    return this.core.fetch('/schema', 'get');
  }

  /**
   * Retrieve a list of versions associated with a project API key.
   *
   * @summary Get versions
   * @throws FetchError<401, types.GetVersionsResponse401> Unauthorized
   * @throws FetchError<403, types.GetVersionsResponse403> Unauthorized
   */
  getVersions(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/version', 'get');
  }

  /**
   * Create a new version.
   *
   * @summary Create version
   * @throws FetchError<400, types.CreateVersionResponse400> There was a validation error during creation.
   * @throws FetchError<401, types.CreateVersionResponse401> Unauthorized
   * @throws FetchError<403, types.CreateVersionResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorVersionForkNotfound> The version couldn't be found.
   */
  createVersion(body: types.Version): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/version', 'post', body);
  }

  /**
   * Returns the version with this version ID.
   *
   * @summary Get version
   * @throws FetchError<401, types.GetVersionResponse401> Unauthorized
   * @throws FetchError<403, types.GetVersionResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorVersionNotfound> The version couldn't be found.
   */
  getVersion(metadata: types.GetVersionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/version/{versionId}', 'get', metadata);
  }

  /**
   * Update an existing version.
   *
   * @summary Update version
   * @throws FetchError<400, types.ErrorVersionCantDemoteStable> A stable version can't be demoted.
   * @throws FetchError<401, types.UpdateVersionResponse401> Unauthorized
   * @throws FetchError<403, types.UpdateVersionResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorVersionNotfound> The version couldn't be found.
   */
  updateVersion(body: types.Version, metadata: types.UpdateVersionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/version/{versionId}', 'put', body, metadata);
  }

  /**
   * Delete a version
   *
   * @summary Delete version
   * @throws FetchError<400, types.ErrorVersionCantRemoveStable> A stable version can't be removed.
   * @throws FetchError<401, types.DeleteVersionResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteVersionResponse403> Unauthorized
   * @throws FetchError<404, types.ErrorVersionNotfound> The version couldn't be found.
   */
  deleteVersion(metadata: types.DeleteVersionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/version/{versionId}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;
