import type * as types from './types';
import type { ConfigOptions } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '@readme/oas-examples/3.0/json/readme.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'readme/2.0.0 (api/5.0-unit-testing)');
  }

  /**
   * Optionally configure various options, such as response parsing, that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.parseResponse If responses are parsed according to its `Content-Type` header.
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
   * Get an API definition file that's been uploaded to ReadMe
   *
   * @summary Retrieve an entry from the API Registry
   */
  get(
    path: '/api-registry/{uuid}',
    metadata: types.GetApiRegistryMetadataParam
  ): Promise<types.GetApiRegistryResponse200 | types.ErrorRegistryNotfound>;
  /**
   * Get API specification metadata
   *
   * @summary Get metadata
   */
  get(
    path: '/api-specification',
    metadata?: types.GetApiSpecificationMetadataParam
  ): Promise<
    | types.GetApiSpecificationResponse200
    | types.ErrorVersionEmpty
    | types.GetApiSpecificationResponse401
    | types.GetApiSpecificationResponse403
    | types.ErrorVersionNotfound
  >;
  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  get(path: '/apply'): Promise<types.GetOpenRolesResponse200>;
  /**
   * Returns all the categories for a specified version
   *
   * @summary Get all categories
   */
  get(
    path: '/categories',
    metadata?: types.GetCategoriesMetadataParam
  ): Promise<types.GetCategoriesResponse200>;
  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  get(
    path: '/categories/{slug}',
    metadata: types.GetCategoryMetadataParam
  ): Promise<types.ErrorCategoryNotfound>;
  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  get(
    path: '/categories/{slug}/docs',
    metadata: types.GetCategoryDocsMetadataParam
  ): Promise<types.ErrorCategoryNotfound>;
  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  get(
    path: '/changelogs',
    metadata?: types.GetChangelogsMetadataParam
  ): Promise<types.GetChangelogsResponse200>;
  /**
   * Returns the changelog with this slug
   *
   * @summary Get changelog
   */
  get<T = unknown>(
    path: '/changelogs/{slug}',
    metadata: types.GetChangelogMetadataParam
  ): Promise<T>;
  /**
   * Returns a list of custom pages associated with the project API key
   *
   * @summary Get custom pages
   */
  get(
    path: '/custompages',
    metadata?: types.GetCustomPagesMetadataParam
  ): Promise<
    | types.GetCustomPagesResponse200
    | types.GetCustomPagesResponse401
    | types.GetCustomPagesResponse403
  >;
  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  get(
    path: '/custompages/{slug}',
    metadata: types.GetCustomPageMetadataParam
  ): Promise<
    types.GetCustomPageResponse401 | types.GetCustomPageResponse403 | types.ErrorCustompageNotfound
  >;
  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  get(
    path: '/docs/{slug}',
    metadata: types.GetDocMetadataParam
  ): Promise<types.GetDocResponse401 | types.GetDocResponse403 | types.ErrorDocNotfound>;
  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  get(path: '/errors'): Promise<types.GetErrorsResponse401 | types.GetErrorsResponse403>;
  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  get(
    path: '/'
  ): Promise<
    types.CondensedProjectData | types.GetProjectResponse401 | types.GetProjectResponse403
  >;
  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  get(path: '/version'): Promise<types.GetVersionsResponse401 | types.GetVersionsResponse403>;
  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  get(
    path: '/version/{versionId}',
    metadata: types.GetVersionMetadataParam
  ): Promise<
    types.GetVersionResponse401 | types.GetVersionResponse403 | types.ErrorVersionNotfound
  >;
  /**
   * Access any GET endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  get<T = unknown>(path: string, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'get', metadata);
  }

  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/docs/automatically-sync-api-specification-with-github
   *
   * @summary Upload specification
   */
  post(
    path: '/api-specification',
    body: types.UploadApiSpecificationBodyParam,
    metadata?: types.UploadApiSpecificationMetadataParam
  ): Promise<
    | types.UploadApiSpecificationResponse400
    | types.UploadApiSpecificationResponse401
    | types.UploadApiSpecificationResponse403
    | types.ErrorSpecTimeout
  >;
  /**
   * This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!
   *
   * @summary Submit your application!
   */
  post<T = unknown>(path: '/apply', body: types.Apply): Promise<T>;
  /**
   * Create a new category inside of this project
   *
   * @summary Create category
   */
  post(
    path: '/categories',
    body: types.Category,
    metadata?: types.CreateCategoryMetadataParam
  ): Promise<types.ErrorCategoryInvalid>;
  /**
   * Create a new changelog inside of this project
   *
   * @summary Create changelog
   */
  post<T = unknown>(path: '/changelogs', body: types.Changelog): Promise<T>;
  /**
   * Create a new custom page inside of this project
   *
   * @summary Create custom page
   */
  post(
    path: '/custompages',
    body: types.CustomPage
  ): Promise<
    | types.ErrorCustompageInvalid
    | types.CreateCustomPageResponse401
    | types.CreateCustomPageResponse403
  >;
  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  post(
    path: '/docs',
    body: types.Doc,
    metadata?: types.CreateDocMetadataParam
  ): Promise<types.ErrorDocInvalid | types.CreateDocResponse401 | types.CreateDocResponse403>;
  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  post(
    path: '/docs/search',
    metadata: types.SearchDocsMetadataParam
  ): Promise<types.SearchDocsResponse401 | types.SearchDocsResponse403>;
  /**
   * Create a new version
   *
   * @summary Create version
   */
  post(
    path: '/version',
    body: types.Version
  ): Promise<
    | types.CreateVersionResponse400
    | types.CreateVersionResponse401
    | types.CreateVersionResponse403
    | types.ErrorVersionForkNotfound
  >;
  /**
   * Access any POST endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  post<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'post', body, metadata);
  }

  /**
   * Update an API specification in ReadMe
   *
   * @summary Update specification
   */
  put(
    path: '/api-specification/{id}',
    body: types.UpdateApiSpecificationBodyParam,
    metadata: types.UpdateApiSpecificationMetadataParam
  ): Promise<
    | types.UpdateApiSpecificationResponse400
    | types.UpdateApiSpecificationResponse401
    | types.UpdateApiSpecificationResponse403
    | types.ErrorSpecTimeout
  >;
  /**
   * Change the properties of a category.
   *
   * @summary Update category
   */
  put(
    path: '/categories/{slug}',
    body: types.Category,
    metadata: types.UpdateCategoryMetadataParam
  ): Promise<types.ErrorCategoryInvalid | types.ErrorCategoryNotfound>;
  /**
   * Update a changelog with this slug
   *
   * @summary Update changelog
   */
  put<T = unknown>(
    path: '/changelogs/{slug}',
    body: types.Changelog,
    metadata: types.UpdateChangelogMetadataParam
  ): Promise<T>;
  /**
   * Update a custom page with this slug
   *
   * @summary Update custom page
   */
  put(
    path: '/custompages/{slug}',
    body: types.CustomPage,
    metadata: types.UpdateCustomPageMetadataParam
  ): Promise<
    | types.ErrorCustompageInvalid
    | types.UpdateCustomPageResponse401
    | types.UpdateCustomPageResponse403
    | types.ErrorCustompageNotfound
  >;
  /**
   * Update a doc with this slug
   *
   * @summary Update doc
   */
  put(
    path: '/docs/{slug}',
    body: types.Doc,
    metadata: types.UpdateDocMetadataParam
  ): Promise<
    | types.ErrorDocInvalid
    | types.UpdateDocResponse401
    | types.UpdateDocResponse403
    | types.ErrorDocNotfound
  >;
  /**
   * Update an existing version
   *
   * @summary Update version
   */
  put(
    path: '/version/{versionId}',
    body: types.Version,
    metadata: types.UpdateVersionMetadataParam
  ): Promise<
    | types.ErrorVersionCantDemoteStable
    | types.UpdateVersionResponse401
    | types.UpdateVersionResponse403
    | types.ErrorVersionNotfound
  >;
  /**
   * Access any PUT endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  put<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'put', body, metadata);
  }

  /**
   * Delete an API specification in ReadMe
   *
   * @summary Delete specification
   */
  delete(
    path: '/api-specification/{id}',
    metadata: types.DeleteApiSpecificationMetadataParam
  ): Promise<
    | types.ErrorSpecIdInvalid
    | types.DeleteApiSpecificationResponse401
    | types.DeleteApiSpecificationResponse403
    | types.ErrorSpecNotfound
  >;
  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   */
  delete(
    path: '/categories/{slug}',
    metadata: types.DeleteCategoryMetadataParam
  ): Promise<types.ErrorCategoryNotfound>;
  /**
   * Delete the changelog with this slug
   *
   * @summary Delete changelog
   */
  delete<T = unknown>(
    path: '/changelogs/{slug}',
    metadata: types.DeleteChangelogMetadataParam
  ): Promise<T>;
  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  delete(
    path: '/custompages/{slug}',
    metadata: types.DeleteCustomPageMetadataParam
  ): Promise<
    | types.DeleteCustomPageResponse401
    | types.DeleteCustomPageResponse403
    | types.ErrorCustompageNotfound
  >;
  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  delete(
    path: '/docs/{slug}',
    metadata: types.DeleteDocMetadataParam
  ): Promise<types.DeleteDocResponse401 | types.DeleteDocResponse403 | types.ErrorDocNotfound>;
  /**
   * Delete a version
   *
   * @summary Delete version
   */
  delete(
    path: '/version/{versionId}',
    metadata: types.DeleteVersionMetadataParam
  ): Promise<
    | types.ErrorVersionCantRemoveStable
    | types.DeleteVersionResponse401
    | types.DeleteVersionResponse403
    | types.ErrorVersionNotfound
  >;
  /**
   * Access any DELETE endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  delete<T = unknown>(
    path: string,
    body?: unknown,
    metadata?: Record<string, unknown>
  ): Promise<T> {
    return this.core.fetch(path, 'delete', body, metadata);
  }

  /**
   * Get an API definition file that's been uploaded to ReadMe
   *
   * @summary Retrieve an entry from the API Registry
   */
  getAPIRegistry(
    metadata: types.GetApiRegistryMetadataParam
  ): Promise<types.GetApiRegistryResponse200 | types.ErrorRegistryNotfound> {
    return this.core.fetch('/api-registry/{uuid}', 'get', metadata);
  }

  /**
   * Get API specification metadata
   *
   * @summary Get metadata
   */
  getAPISpecification(
    metadata?: types.GetApiSpecificationMetadataParam
  ): Promise<
    | types.GetApiSpecificationResponse200
    | types.ErrorVersionEmpty
    | types.GetApiSpecificationResponse401
    | types.GetApiSpecificationResponse403
    | types.ErrorVersionNotfound
  > {
    return this.core.fetch('/api-specification', 'get', metadata);
  }

  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/docs/automatically-sync-api-specification-with-github
   *
   * @summary Upload specification
   */
  uploadAPISpecification(
    body: types.UploadApiSpecificationBodyParam,
    metadata?: types.UploadApiSpecificationMetadataParam
  ): Promise<
    | types.UploadApiSpecificationResponse400
    | types.UploadApiSpecificationResponse401
    | types.UploadApiSpecificationResponse403
    | types.ErrorSpecTimeout
  > {
    return this.core.fetch('/api-specification', 'post', body, metadata);
  }

  /**
   * Update an API specification in ReadMe
   *
   * @summary Update specification
   */
  updateAPISpecification(
    body: types.UpdateApiSpecificationBodyParam,
    metadata: types.UpdateApiSpecificationMetadataParam
  ): Promise<
    | types.UpdateApiSpecificationResponse400
    | types.UpdateApiSpecificationResponse401
    | types.UpdateApiSpecificationResponse403
    | types.ErrorSpecTimeout
  > {
    return this.core.fetch('/api-specification/{id}', 'put', body, metadata);
  }

  /**
   * Delete an API specification in ReadMe
   *
   * @summary Delete specification
   */
  deleteAPISpecification(
    metadata: types.DeleteApiSpecificationMetadataParam
  ): Promise<
    | types.ErrorSpecIdInvalid
    | types.DeleteApiSpecificationResponse401
    | types.DeleteApiSpecificationResponse403
    | types.ErrorSpecNotfound
  > {
    return this.core.fetch('/api-specification/{id}', 'delete', metadata);
  }

  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  getOpenRoles(): Promise<types.GetOpenRolesResponse200> {
    return this.core.fetch('/apply', 'get');
  }

  /**
   * This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!
   *
   * @summary Submit your application!
   */
  applyToReadMe<T = unknown>(body: types.Apply): Promise<T> {
    return this.core.fetch('/apply', 'post', body);
  }

  /**
   * Returns all the categories for a specified version
   *
   * @summary Get all categories
   */
  getCategories(
    metadata?: types.GetCategoriesMetadataParam
  ): Promise<types.GetCategoriesResponse200> {
    return this.core.fetch('/categories', 'get', metadata);
  }

  /**
   * Create a new category inside of this project
   *
   * @summary Create category
   */
  createCategory(
    body: types.Category,
    metadata?: types.CreateCategoryMetadataParam
  ): Promise<types.ErrorCategoryInvalid> {
    return this.core.fetch('/categories', 'post', body, metadata);
  }

  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  getCategory(metadata: types.GetCategoryMetadataParam): Promise<types.ErrorCategoryNotfound> {
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
  ): Promise<types.ErrorCategoryInvalid | types.ErrorCategoryNotfound> {
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
  ): Promise<types.ErrorCategoryNotfound> {
    return this.core.fetch('/categories/{slug}', 'delete', metadata);
  }

  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  getCategoryDocs(
    metadata: types.GetCategoryDocsMetadataParam
  ): Promise<types.ErrorCategoryNotfound> {
    return this.core.fetch('/categories/{slug}/docs', 'get', metadata);
  }

  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  getChangelogs(
    metadata?: types.GetChangelogsMetadataParam
  ): Promise<types.GetChangelogsResponse200> {
    return this.core.fetch('/changelogs', 'get', metadata);
  }

  /**
   * Create a new changelog inside of this project
   *
   * @summary Create changelog
   */
  createChangelog<T = unknown>(body: types.Changelog): Promise<T> {
    return this.core.fetch('/changelogs', 'post', body);
  }

  /**
   * Returns the changelog with this slug
   *
   * @summary Get changelog
   */
  getChangelog<T = unknown>(metadata: types.GetChangelogMetadataParam): Promise<T> {
    return this.core.fetch('/changelogs/{slug}', 'get', metadata);
  }

  /**
   * Update a changelog with this slug
   *
   * @summary Update changelog
   */
  updateChangelog<T = unknown>(
    body: types.Changelog,
    metadata: types.UpdateChangelogMetadataParam
  ): Promise<T> {
    return this.core.fetch('/changelogs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the changelog with this slug
   *
   * @summary Delete changelog
   */
  deleteChangelog<T = unknown>(metadata: types.DeleteChangelogMetadataParam): Promise<T> {
    return this.core.fetch('/changelogs/{slug}', 'delete', metadata);
  }

  /**
   * Returns a list of custom pages associated with the project API key
   *
   * @summary Get custom pages
   */
  getCustomPages(
    metadata?: types.GetCustomPagesMetadataParam
  ): Promise<
    | types.GetCustomPagesResponse200
    | types.GetCustomPagesResponse401
    | types.GetCustomPagesResponse403
  > {
    return this.core.fetch('/custompages', 'get', metadata);
  }

  /**
   * Create a new custom page inside of this project
   *
   * @summary Create custom page
   */
  createCustomPage(
    body: types.CustomPage
  ): Promise<
    | types.ErrorCustompageInvalid
    | types.CreateCustomPageResponse401
    | types.CreateCustomPageResponse403
  > {
    return this.core.fetch('/custompages', 'post', body);
  }

  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  getCustomPage(
    metadata: types.GetCustomPageMetadataParam
  ): Promise<
    types.GetCustomPageResponse401 | types.GetCustomPageResponse403 | types.ErrorCustompageNotfound
  > {
    return this.core.fetch('/custompages/{slug}', 'get', metadata);
  }

  /**
   * Update a custom page with this slug
   *
   * @summary Update custom page
   */
  updateCustomPage(
    body: types.CustomPage,
    metadata: types.UpdateCustomPageMetadataParam
  ): Promise<
    | types.ErrorCustompageInvalid
    | types.UpdateCustomPageResponse401
    | types.UpdateCustomPageResponse403
    | types.ErrorCustompageNotfound
  > {
    return this.core.fetch('/custompages/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  deleteCustomPage(
    metadata: types.DeleteCustomPageMetadataParam
  ): Promise<
    | types.DeleteCustomPageResponse401
    | types.DeleteCustomPageResponse403
    | types.ErrorCustompageNotfound
  > {
    return this.core.fetch('/custompages/{slug}', 'delete', metadata);
  }

  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  getDoc(
    metadata: types.GetDocMetadataParam
  ): Promise<types.GetDocResponse401 | types.GetDocResponse403 | types.ErrorDocNotfound> {
    return this.core.fetch('/docs/{slug}', 'get', metadata);
  }

  /**
   * Update a doc with this slug
   *
   * @summary Update doc
   */
  updateDoc(
    body: types.Doc,
    metadata: types.UpdateDocMetadataParam
  ): Promise<
    | types.ErrorDocInvalid
    | types.UpdateDocResponse401
    | types.UpdateDocResponse403
    | types.ErrorDocNotfound
  > {
    return this.core.fetch('/docs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  deleteDoc(
    metadata: types.DeleteDocMetadataParam
  ): Promise<types.DeleteDocResponse401 | types.DeleteDocResponse403 | types.ErrorDocNotfound> {
    return this.core.fetch('/docs/{slug}', 'delete', metadata);
  }

  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  createDoc(
    body: types.Doc,
    metadata?: types.CreateDocMetadataParam
  ): Promise<types.ErrorDocInvalid | types.CreateDocResponse401 | types.CreateDocResponse403> {
    return this.core.fetch('/docs', 'post', body, metadata);
  }

  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  searchDocs(
    metadata: types.SearchDocsMetadataParam
  ): Promise<types.SearchDocsResponse401 | types.SearchDocsResponse403> {
    return this.core.fetch('/docs/search', 'post', metadata);
  }

  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  getErrors(): Promise<types.GetErrorsResponse401 | types.GetErrorsResponse403> {
    return this.core.fetch('/errors', 'get');
  }

  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  getProject(): Promise<
    types.CondensedProjectData | types.GetProjectResponse401 | types.GetProjectResponse403
  > {
    return this.core.fetch('/', 'get');
  }

  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  getVersions(): Promise<types.GetVersionsResponse401 | types.GetVersionsResponse403> {
    return this.core.fetch('/version', 'get');
  }

  /**
   * Create a new version
   *
   * @summary Create version
   */
  createVersion(
    body: types.Version
  ): Promise<
    | types.CreateVersionResponse400
    | types.CreateVersionResponse401
    | types.CreateVersionResponse403
    | types.ErrorVersionForkNotfound
  > {
    return this.core.fetch('/version', 'post', body);
  }

  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  getVersion(
    metadata: types.GetVersionMetadataParam
  ): Promise<
    types.GetVersionResponse401 | types.GetVersionResponse403 | types.ErrorVersionNotfound
  > {
    return this.core.fetch('/version/{versionId}', 'get', metadata);
  }

  /**
   * Update an existing version
   *
   * @summary Update version
   */
  updateVersion(
    body: types.Version,
    metadata: types.UpdateVersionMetadataParam
  ): Promise<
    | types.ErrorVersionCantDemoteStable
    | types.UpdateVersionResponse401
    | types.UpdateVersionResponse403
    | types.ErrorVersionNotfound
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
    | types.ErrorVersionCantRemoveStable
    | types.DeleteVersionResponse401
    | types.DeleteVersionResponse403
    | types.ErrorVersionNotfound
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
  ErrorCategoryInvalid,
  ErrorCategoryNotfound,
  ErrorCustompageInvalid,
  ErrorCustompageNotfound,
  ErrorDocInvalid,
  ErrorDocNotfound,
  ErrorRegistryNotfound,
  ErrorSpecIdInvalid,
  ErrorSpecNotfound,
  ErrorSpecTimeout,
  ErrorVersionCantDemoteStable,
  ErrorVersionCantRemoveStable,
  ErrorVersionEmpty,
  ErrorVersionForkNotfound,
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
  GetProjectResponse401,
  GetProjectResponse403,
  GetVersionMetadataParam,
  GetVersionResponse401,
  GetVersionResponse403,
  GetVersionsResponse401,
  GetVersionsResponse403,
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
