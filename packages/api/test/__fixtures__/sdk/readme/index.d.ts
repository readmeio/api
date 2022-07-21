import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][];
  constructor();
  /**
   * Optionally configure various options, such as response parsing, that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.parseResponse If responses are parsed according to its `Content-Type` header.
   */
  config(config: ConfigOptions): void;
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
  auth(...values: string[] | number[]): this;
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
  server(url: string, variables?: {}): void;
  /**
   * Get an API definition file that's been uploaded to ReadMe
   *
   * @summary Retrieve an entry from the API Registry
   */
  get(
    path: '/api-registry/{uuid}',
    metadata: GetAPIRegistryMetadataParam
  ): Promise<GetAPIRegistry_Response_200 | Error_REGISTRY_NOTFOUND>;
  /**
   * Get API specification metadata
   *
   * @summary Get metadata
   */
  get(
    path: '/api-specification',
    metadata?: GetAPISpecificationMetadataParam
  ): Promise<
    | GetAPISpecification_Response_200
    | Error_VERSION_EMPTY
    | GetAPISpecification_Response_401
    | GetAPISpecification_Response_403
    | Error_VERSION_NOTFOUND
  >;
  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  get(path: '/apply'): Promise<GetOpenRoles_Response_200>;
  /**
   * Returns all the categories for a specified version
   *
   * @summary Get all categories
   */
  get(path: '/categories', metadata?: GetCategoriesMetadataParam): Promise<GetCategories_Response_200>;
  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  get(path: '/categories/{slug}', metadata: GetCategoryMetadataParam): Promise<Error_CATEGORY_NOTFOUND>;
  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  get(path: '/categories/{slug}/docs', metadata: GetCategoryDocsMetadataParam): Promise<Error_CATEGORY_NOTFOUND>;
  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  get(path: '/changelogs', metadata?: GetChangelogsMetadataParam): Promise<GetChangelogs_Response_200>;
  /**
   * Returns the changelog with this slug
   *
   * @summary Get changelog
   */
  get<T = unknown>(path: '/changelogs/{slug}', metadata: GetChangelogMetadataParam): Promise<T>;
  /**
   * Returns a list of custom pages associated with the project API key
   *
   * @summary Get custom pages
   */
  get(
    path: '/custompages',
    metadata?: GetCustomPagesMetadataParam
  ): Promise<GetCustomPages_Response_200 | GetCustomPages_Response_401 | GetCustomPages_Response_403>;
  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  get(
    path: '/custompages/{slug}',
    metadata: GetCustomPageMetadataParam
  ): Promise<GetCustomPage_Response_401 | GetCustomPage_Response_403 | Error_CUSTOMPAGE_NOTFOUND>;
  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  get(
    path: '/docs/{slug}',
    metadata: GetDocMetadataParam
  ): Promise<GetDoc_Response_401 | GetDoc_Response_403 | Error_DOC_NOTFOUND>;
  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  get(path: '/errors'): Promise<GetErrors_Response_401 | GetErrors_Response_403>;
  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  get(path: '/'): Promise<CondensedProjectData | GetProject_Response_401 | GetProject_Response_403>;
  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  get(path: '/version'): Promise<GetVersions_Response_401 | GetVersions_Response_403>;
  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  get(
    path: '/version/{versionId}',
    metadata: GetVersionMetadataParam
  ): Promise<GetVersion_Response_401 | GetVersion_Response_403 | Error_VERSION_NOTFOUND>;
  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/docs/automatically-sync-api-specification-with-github
   *
   * @summary Upload specification
   */
  post(
    path: '/api-specification',
    body: UploadAPISpecificationBodyParam,
    metadata?: UploadAPISpecificationMetadataParam
  ): Promise<
    | UploadAPISpecification_Response_400
    | UploadAPISpecification_Response_401
    | UploadAPISpecification_Response_403
    | Error_SPEC_TIMEOUT
  >;
  /**
   * This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!
   *
   * @summary Submit your application!
   */
  post<T = unknown>(path: '/apply', body: Apply): Promise<T>;
  /**
   * Create a new category inside of this project
   *
   * @summary Create category
   */
  post(path: '/categories', body: Category, metadata?: CreateCategoryMetadataParam): Promise<Error_CATEGORY_INVALID>;
  /**
   * Create a new changelog inside of this project
   *
   * @summary Create changelog
   */
  post<T = unknown>(path: '/changelogs', body: Changelog): Promise<T>;
  /**
   * Create a new custom page inside of this project
   *
   * @summary Create custom page
   */
  post(
    path: '/custompages',
    body: CustomPage
  ): Promise<Error_CUSTOMPAGE_INVALID | CreateCustomPage_Response_401 | CreateCustomPage_Response_403>;
  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  post(
    path: '/docs',
    body: Doc,
    metadata?: CreateDocMetadataParam
  ): Promise<Error_DOC_INVALID | CreateDoc_Response_401 | CreateDoc_Response_403>;
  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  post(
    path: '/docs/search',
    metadata: SearchDocsMetadataParam
  ): Promise<SearchDocs_Response_401 | SearchDocs_Response_403>;
  /**
   * Create a new version
   *
   * @summary Create version
   */
  post(
    path: '/version',
    body: Version
  ): Promise<
    CreateVersion_Response_400 | CreateVersion_Response_401 | CreateVersion_Response_403 | Error_VERSION_FORK_NOTFOUND
  >;
  /**
   * Update an API specification in ReadMe
   *
   * @summary Update specification
   */
  put(
    path: '/api-specification/{id}',
    body: UpdateAPISpecificationBodyParam,
    metadata: UpdateAPISpecificationMetadataParam
  ): Promise<
    | UpdateAPISpecification_Response_400
    | UpdateAPISpecification_Response_401
    | UpdateAPISpecification_Response_403
    | Error_SPEC_TIMEOUT
  >;
  /**
   * Change the properties of a category.
   *
   * @summary Update category
   */
  put(
    path: '/categories/{slug}',
    body: Category,
    metadata: UpdateCategoryMetadataParam
  ): Promise<Error_CATEGORY_INVALID | Error_CATEGORY_NOTFOUND>;
  /**
   * Update a changelog with this slug
   *
   * @summary Update changelog
   */
  put<T = unknown>(path: '/changelogs/{slug}', body: Changelog, metadata: UpdateChangelogMetadataParam): Promise<T>;
  /**
   * Update a custom page with this slug
   *
   * @summary Update custom page
   */
  put(
    path: '/custompages/{slug}',
    body: CustomPage,
    metadata: UpdateCustomPageMetadataParam
  ): Promise<
    Error_CUSTOMPAGE_INVALID | UpdateCustomPage_Response_401 | UpdateCustomPage_Response_403 | Error_CUSTOMPAGE_NOTFOUND
  >;
  /**
   * Update a doc with this slug
   *
   * @summary Update doc
   */
  put(
    path: '/docs/{slug}',
    body: Doc,
    metadata: UpdateDocMetadataParam
  ): Promise<Error_DOC_INVALID | UpdateDoc_Response_401 | UpdateDoc_Response_403 | Error_DOC_NOTFOUND>;
  /**
   * Update an existing version
   *
   * @summary Update version
   */
  put(
    path: '/version/{versionId}',
    body: Version,
    metadata: UpdateVersionMetadataParam
  ): Promise<
    Error_VERSION_CANT_DEMOTE_STABLE | UpdateVersion_Response_401 | UpdateVersion_Response_403 | Error_VERSION_NOTFOUND
  >;
  /**
   * Delete an API specification in ReadMe
   *
   * @summary Delete specification
   */
  delete(
    path: '/api-specification/{id}',
    metadata: DeleteAPISpecificationMetadataParam
  ): Promise<
    | Error_SPEC_ID_INVALID
    | DeleteAPISpecification_Response_401
    | DeleteAPISpecification_Response_403
    | Error_SPEC_NOTFOUND
  >;
  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   */
  delete(path: '/categories/{slug}', metadata: DeleteCategoryMetadataParam): Promise<Error_CATEGORY_NOTFOUND>;
  /**
   * Delete the changelog with this slug
   *
   * @summary Delete changelog
   */
  delete<T = unknown>(path: '/changelogs/{slug}', metadata: DeleteChangelogMetadataParam): Promise<T>;
  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  delete(
    path: '/custompages/{slug}',
    metadata: DeleteCustomPageMetadataParam
  ): Promise<DeleteCustomPage_Response_401 | DeleteCustomPage_Response_403 | Error_CUSTOMPAGE_NOTFOUND>;
  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  delete(
    path: '/docs/{slug}',
    metadata: DeleteDocMetadataParam
  ): Promise<DeleteDoc_Response_401 | DeleteDoc_Response_403 | Error_DOC_NOTFOUND>;
  /**
   * Delete a version
   *
   * @summary Delete version
   */
  delete(
    path: '/version/{versionId}',
    metadata: DeleteVersionMetadataParam
  ): Promise<
    Error_VERSION_CANT_REMOVE_STABLE | DeleteVersion_Response_401 | DeleteVersion_Response_403 | Error_VERSION_NOTFOUND
  >;
  /**
   * Get an API definition file that's been uploaded to ReadMe
   *
   * @summary Retrieve an entry from the API Registry
   */
  getAPIRegistry(metadata: GetAPIRegistryMetadataParam): Promise<GetAPIRegistry_Response_200 | Error_REGISTRY_NOTFOUND>;
  /**
   * Get API specification metadata
   *
   * @summary Get metadata
   */
  getAPISpecification(
    metadata?: GetAPISpecificationMetadataParam
  ): Promise<
    | GetAPISpecification_Response_200
    | Error_VERSION_EMPTY
    | GetAPISpecification_Response_401
    | GetAPISpecification_Response_403
    | Error_VERSION_NOTFOUND
  >;
  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/docs/automatically-sync-api-specification-with-github
   *
   * @summary Upload specification
   */
  uploadAPISpecification(
    body: UploadAPISpecificationBodyParam,
    metadata?: UploadAPISpecificationMetadataParam
  ): Promise<
    | UploadAPISpecification_Response_400
    | UploadAPISpecification_Response_401
    | UploadAPISpecification_Response_403
    | Error_SPEC_TIMEOUT
  >;
  /**
   * Update an API specification in ReadMe
   *
   * @summary Update specification
   */
  updateAPISpecification(
    body: UpdateAPISpecificationBodyParam,
    metadata: UpdateAPISpecificationMetadataParam
  ): Promise<
    | UpdateAPISpecification_Response_400
    | UpdateAPISpecification_Response_401
    | UpdateAPISpecification_Response_403
    | Error_SPEC_TIMEOUT
  >;
  /**
   * Delete an API specification in ReadMe
   *
   * @summary Delete specification
   */
  deleteAPISpecification(
    metadata: DeleteAPISpecificationMetadataParam
  ): Promise<
    | Error_SPEC_ID_INVALID
    | DeleteAPISpecification_Response_401
    | DeleteAPISpecification_Response_403
    | Error_SPEC_NOTFOUND
  >;
  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  getOpenRoles(): Promise<GetOpenRoles_Response_200>;
  /**
   * This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!
   *
   * @summary Submit your application!
   */
  applyToReadMe<T = unknown>(body: Apply): Promise<T>;
  /**
   * Returns all the categories for a specified version
   *
   * @summary Get all categories
   */
  getCategories(metadata?: GetCategoriesMetadataParam): Promise<GetCategories_Response_200>;
  /**
   * Create a new category inside of this project
   *
   * @summary Create category
   */
  createCategory(body: Category, metadata?: CreateCategoryMetadataParam): Promise<Error_CATEGORY_INVALID>;
  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  getCategory(metadata: GetCategoryMetadataParam): Promise<Error_CATEGORY_NOTFOUND>;
  /**
   * Change the properties of a category.
   *
   * @summary Update category
   */
  updateCategory(
    body: Category,
    metadata: UpdateCategoryMetadataParam
  ): Promise<Error_CATEGORY_INVALID | Error_CATEGORY_NOTFOUND>;
  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   */
  deleteCategory(metadata: DeleteCategoryMetadataParam): Promise<Error_CATEGORY_NOTFOUND>;
  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  getCategoryDocs(metadata: GetCategoryDocsMetadataParam): Promise<Error_CATEGORY_NOTFOUND>;
  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  getChangelogs(metadata?: GetChangelogsMetadataParam): Promise<GetChangelogs_Response_200>;
  /**
   * Create a new changelog inside of this project
   *
   * @summary Create changelog
   */
  createChangelog<T = unknown>(body: Changelog): Promise<T>;
  /**
   * Returns the changelog with this slug
   *
   * @summary Get changelog
   */
  getChangelog<T = unknown>(metadata: GetChangelogMetadataParam): Promise<T>;
  /**
   * Update a changelog with this slug
   *
   * @summary Update changelog
   */
  updateChangelog<T = unknown>(body: Changelog, metadata: UpdateChangelogMetadataParam): Promise<T>;
  /**
   * Delete the changelog with this slug
   *
   * @summary Delete changelog
   */
  deleteChangelog<T = unknown>(metadata: DeleteChangelogMetadataParam): Promise<T>;
  /**
   * Returns a list of custom pages associated with the project API key
   *
   * @summary Get custom pages
   */
  getCustomPages(
    metadata?: GetCustomPagesMetadataParam
  ): Promise<GetCustomPages_Response_200 | GetCustomPages_Response_401 | GetCustomPages_Response_403>;
  /**
   * Create a new custom page inside of this project
   *
   * @summary Create custom page
   */
  createCustomPage(
    body: CustomPage
  ): Promise<Error_CUSTOMPAGE_INVALID | CreateCustomPage_Response_401 | CreateCustomPage_Response_403>;
  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  getCustomPage(
    metadata: GetCustomPageMetadataParam
  ): Promise<GetCustomPage_Response_401 | GetCustomPage_Response_403 | Error_CUSTOMPAGE_NOTFOUND>;
  /**
   * Update a custom page with this slug
   *
   * @summary Update custom page
   */
  updateCustomPage(
    body: CustomPage,
    metadata: UpdateCustomPageMetadataParam
  ): Promise<
    Error_CUSTOMPAGE_INVALID | UpdateCustomPage_Response_401 | UpdateCustomPage_Response_403 | Error_CUSTOMPAGE_NOTFOUND
  >;
  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  deleteCustomPage(
    metadata: DeleteCustomPageMetadataParam
  ): Promise<DeleteCustomPage_Response_401 | DeleteCustomPage_Response_403 | Error_CUSTOMPAGE_NOTFOUND>;
  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  getDoc(metadata: GetDocMetadataParam): Promise<GetDoc_Response_401 | GetDoc_Response_403 | Error_DOC_NOTFOUND>;
  /**
   * Update a doc with this slug
   *
   * @summary Update doc
   */
  updateDoc(
    body: Doc,
    metadata: UpdateDocMetadataParam
  ): Promise<Error_DOC_INVALID | UpdateDoc_Response_401 | UpdateDoc_Response_403 | Error_DOC_NOTFOUND>;
  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  deleteDoc(
    metadata: DeleteDocMetadataParam
  ): Promise<DeleteDoc_Response_401 | DeleteDoc_Response_403 | Error_DOC_NOTFOUND>;
  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  createDoc(
    body: Doc,
    metadata?: CreateDocMetadataParam
  ): Promise<Error_DOC_INVALID | CreateDoc_Response_401 | CreateDoc_Response_403>;
  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  searchDocs(metadata: SearchDocsMetadataParam): Promise<SearchDocs_Response_401 | SearchDocs_Response_403>;
  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  getErrors(): Promise<GetErrors_Response_401 | GetErrors_Response_403>;
  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  getProject(): Promise<CondensedProjectData | GetProject_Response_401 | GetProject_Response_403>;
  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  getVersions(): Promise<GetVersions_Response_401 | GetVersions_Response_403>;
  /**
   * Create a new version
   *
   * @summary Create version
   */
  createVersion(
    body: Version
  ): Promise<
    CreateVersion_Response_400 | CreateVersion_Response_401 | CreateVersion_Response_403 | Error_VERSION_FORK_NOTFOUND
  >;
  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  getVersion(
    metadata: GetVersionMetadataParam
  ): Promise<GetVersion_Response_401 | GetVersion_Response_403 | Error_VERSION_NOTFOUND>;
  /**
   * Update an existing version
   *
   * @summary Update version
   */
  updateVersion(
    body: Version,
    metadata: UpdateVersionMetadataParam
  ): Promise<
    Error_VERSION_CANT_DEMOTE_STABLE | UpdateVersion_Response_401 | UpdateVersion_Response_403 | Error_VERSION_NOTFOUND
  >;
  /**
   * Delete a version
   *
   * @summary Delete version
   */
  deleteVersion(
    metadata: DeleteVersionMetadataParam
  ): Promise<
    Error_VERSION_CANT_REMOVE_STABLE | DeleteVersion_Response_401 | DeleteVersion_Response_403 | Error_VERSION_NOTFOUND
  >;
}
export default function createSDK(): SDK;
interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
declare type GetAPIRegistryMetadataParam = {
  /**
   * An API Registry UUID. This can be found by navigating to your API Reference page and viewing code snippets for Node with the `api` library.
   */
  uuid: string;
  [k: string]: unknown;
};
interface GetAPIRegistry_Response_200 {
  [k: string]: unknown;
}
interface Error_REGISTRY_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type GetAPISpecificationMetadataParam = {
  /**
   * Number of items to include in pagination (up to 100, defaults to 10)
   */
  perPage?: number;
  /**
   * Used to specify further pages (starts at 1)
   */
  page?: number;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
interface GetAPISpecification_Response_200 {
  /**
   * Pagination information. See https://docs.readme.com/reference/pagination for more information.
   */
  Link?: string;
  /**
   * The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.
   */
  'x-total-count'?: string;
  [k: string]: unknown;
}
interface Error_VERSION_EMPTY {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type GetAPISpecification_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
interface Error_APIKEY_EMPTY {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_APIKEY_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type GetAPISpecification_Response_403 = Error_APIKEY_MISMATCH;
interface Error_APIKEY_MISMATCH {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_VERSION_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface UploadAPISpecificationBodyParam {
  /**
   * OpenAPI/Swagger file
   */
  spec?: string;
  [k: string]: unknown;
}
declare type UploadAPISpecificationMetadataParam = {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type UploadAPISpecification_Response_400 =
  | Error_SPEC_FILE_EMPTY
  | Error_SPEC_INVALID
  | Error_SPEC_INVALID_SCHEMA
  | Error_SPEC_VERSION_NOTFOUND;
interface Error_SPEC_FILE_EMPTY {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_SPEC_INVALID {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_SPEC_INVALID_SCHEMA {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_SPEC_VERSION_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type UploadAPISpecification_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type UploadAPISpecification_Response_403 = Error_APIKEY_MISMATCH;
interface Error_SPEC_TIMEOUT {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface UpdateAPISpecificationBodyParam {
  /**
   * OpenAPI/Swagger file
   */
  spec?: string;
  [k: string]: unknown;
}
declare type UpdateAPISpecificationMetadataParam = {
  /**
   * ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.
   */
  id: string;
  [k: string]: unknown;
};
declare type UpdateAPISpecification_Response_400 =
  | Error_SPEC_FILE_EMPTY
  | Error_SPEC_ID_DUPLICATE
  | Error_SPEC_ID_INVALID
  | Error_SPEC_INVALID
  | Error_SPEC_INVALID_SCHEMA
  | Error_SPEC_VERSION_NOTFOUND;
interface Error_SPEC_ID_DUPLICATE {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_SPEC_ID_INVALID {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type UpdateAPISpecification_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type UpdateAPISpecification_Response_403 = Error_APIKEY_MISMATCH;
declare type DeleteAPISpecificationMetadataParam = {
  /**
   * ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.
   */
  id: string;
  [k: string]: unknown;
};
declare type DeleteAPISpecification_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type DeleteAPISpecification_Response_403 = Error_APIKEY_MISMATCH;
interface Error_SPEC_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type GetOpenRoles_Response_200 = JobOpening[];
interface JobOpening {
  /**
   * A slugified version of the job opening title.
   */
  slug?: string;
  /**
   * The job opening position.
   */
  title?: string;
  /**
   * The description for this open position. This content is formatted as HTML.
   */
  description?: string;
  /**
   * A short pullquote for the open position.
   */
  pullquote?: string;
  /**
   * Where this position is located at.
   */
  location?: string;
  /**
   * The internal organization you'll be working in.
   */
  department?: string;
  /**
   * The place where you can apply for the position!
   */
  url?: string;
  [k: string]: unknown;
}
interface Apply {
  /**
   * Your full name
   */
  name: string;
  /**
   * A valid email we can reach you at
   */
  email: string;
  /**
   * The job you're looking to apply for (https://readme.com/careers)
   */
  job:
    | 'Content Marketing Manager'
    | 'Engineering Manager'
    | 'Head of People'
    | 'Marketing Campaigns Manager'
    | 'Marketing Designer'
    | 'Product Designer'
    | 'Product Education Manager'
    | 'Sales Development Representative'
    | 'Support Engineer (Weekends)';
  /**
   * Learn more at https://pronoun.is/
   */
  pronouns?: string;
  /**
   * What have you been up to the past few years?
   */
  linkedin?: string;
  /**
   * Or Bitbucket, Gitlab or anywhere else your code is hosted!
   */
  github?: string;
  /**
   * What should we know about you?
   */
  coverLetter?: string;
  /**
   * Want to play with the API but not actually apply? Set this to true.
   */
  dontReallyApply?: boolean;
  [k: string]: unknown;
}
declare type GetCategoriesMetadataParam = {
  /**
   * Number of items to include in pagination (up to 100, defaults to 10)
   */
  perPage?: number;
  /**
   * Used to specify further pages (starts at 1)
   */
  page?: number;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
interface GetCategories_Response_200 {
  /**
   * Pagination information. See https://docs.readme.com/reference/pagination for more information.
   */
  Link?: string;
  /**
   * The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.
   */
  'x-total-count'?: string;
  [k: string]: unknown;
}
interface Category {
  /**
   * A short title for the category. This is what will show in the sidebar.
   */
  title?: string;
  /**
   * A category can be part of your reference or guide documentation, which is determined by this field.
   */
  type?: 'reference' | 'guide';
  [k: string]: unknown;
}
declare type CreateCategoryMetadataParam = {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
interface Error_CATEGORY_INVALID {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type GetCategoryMetadataParam = {
  /**
   * A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
interface Error_CATEGORY_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type UpdateCategoryMetadataParam = {
  /**
   * A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type DeleteCategoryMetadataParam = {
  /**
   * A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type GetCategoryDocsMetadataParam = {
  /**
   * A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type GetChangelogsMetadataParam = {
  /**
   * Number of items to include in pagination (up to 100, defaults to 10)
   */
  perPage?: number;
  /**
   * Used to specify further pages (starts at 1)
   */
  page?: number;
  [k: string]: unknown;
};
interface GetChangelogs_Response_200 {
  /**
   * Pagination information. See https://docs.readme.com/reference/pagination for more information.
   */
  Link?: string;
  /**
   * The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.
   */
  'x-total-count'?: string;
  [k: string]: unknown;
}
interface Changelog {
  /**
   * Title of the changelog
   */
  title: string;
  type?: '' | 'added' | 'fixed' | 'improved' | 'deprecated' | 'removed';
  /**
   * Body content of the changelog
   */
  body: string;
  /**
   * Visibility of the changelog
   */
  hidden?: boolean;
  [k: string]: unknown;
}
declare type GetChangelogMetadataParam = {
  /**
   * A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"
   */
  slug: string;
  [k: string]: unknown;
};
declare type UpdateChangelogMetadataParam = {
  /**
   * A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"
   */
  slug: string;
  [k: string]: unknown;
};
declare type DeleteChangelogMetadataParam = {
  /**
   * A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"
   */
  slug: string;
  [k: string]: unknown;
};
declare type GetCustomPagesMetadataParam = {
  /**
   * Number of items to include in pagination (up to 100, defaults to 10)
   */
  perPage?: number;
  /**
   * Used to specify further pages (starts at 1)
   */
  page?: number;
  [k: string]: unknown;
};
interface GetCustomPages_Response_200 {
  /**
   * Pagination information. See https://docs.readme.com/reference/pagination for more information.
   */
  Link?: string;
  /**
   * The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.
   */
  'x-total-count'?: string;
  [k: string]: unknown;
}
declare type GetCustomPages_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetCustomPages_Response_403 = Error_APIKEY_MISMATCH;
interface CustomPage {
  /**
   * Title of the custom page
   */
  title: string;
  /**
   * Body formatted in Markdown (displayed by default).
   */
  body?: string;
  /**
   * Body formatted in HTML (sanitized, only displayed if `htmlmode` is **true**).
   */
  html?: string;
  /**
   * **true** if `html` should be displayed, **false** if `body` should be displayed.
   */
  htmlmode?: boolean;
  /**
   * Visibility of the custom page
   */
  hidden?: boolean;
  [k: string]: unknown;
}
interface Error_CUSTOMPAGE_INVALID {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type CreateCustomPage_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type CreateCustomPage_Response_403 = Error_APIKEY_MISMATCH;
declare type GetCustomPageMetadataParam = {
  /**
   * A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
};
declare type GetCustomPage_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetCustomPage_Response_403 = Error_APIKEY_MISMATCH;
interface Error_CUSTOMPAGE_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type UpdateCustomPageMetadataParam = {
  /**
   * A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
};
declare type UpdateCustomPage_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type UpdateCustomPage_Response_403 = Error_APIKEY_MISMATCH;
declare type DeleteCustomPageMetadataParam = {
  /**
   * A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"
   */
  slug: string;
  [k: string]: unknown;
};
declare type DeleteCustomPage_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type DeleteCustomPage_Response_403 = Error_APIKEY_MISMATCH;
declare type GetDocMetadataParam = {
  /**
   * A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type GetDoc_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetDoc_Response_403 = Error_APIKEY_MISMATCH;
interface Error_DOC_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Doc {
  /**
   * Title of the page
   */
  title: string;
  /**
   * Type of the page. The available types all show up under the /docs/ URL path of your docs project (also known as the "guides" section). Can be "basic" (most common), "error" (page desribing an API error), or "link" (page that redirects to an external link)
   */
  type?: 'basic' | 'error' | 'link';
  /**
   * Body content of the page, formatted in ReadMe or GitHub flavored Markdown. Accepts long page content, for example, greater than 100k characters
   */
  body?: string;
  /**
   * Category ID of the page, which you can get through https://docs.readme.com/reference/categories#getcategory
   */
  category: string;
  /**
   * Visibility of the page
   */
  hidden?: boolean;
  /**
   * The position of the page in your project sidebar.
   */
  order?: number;
  /**
   * For a subpage, specify the parent doc ID, which you can get through https://docs.readme.com/reference/docs#getdoc
   */
  parentDoc?: string;
  error?: {
    /**
     * The error code for docs with the "error" type
     */
    code?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
declare type UpdateDocMetadataParam = {
  /**
   * A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
interface Error_DOC_INVALID {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type UpdateDoc_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type UpdateDoc_Response_403 = Error_APIKEY_MISMATCH;
declare type DeleteDocMetadataParam = {
  /**
   * A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"
   */
  slug: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type DeleteDoc_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type DeleteDoc_Response_403 = Error_APIKEY_MISMATCH;
declare type CreateDocMetadataParam = {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type CreateDoc_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type CreateDoc_Response_403 = Error_APIKEY_MISMATCH;
declare type SearchDocsMetadataParam = {
  /**
   * Search string to look for
   */
  search: string;
  [k: string]: unknown;
} & {
  /**
   * Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.
   */
  'x-readme-version'?: string;
  [k: string]: unknown;
};
declare type SearchDocs_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type SearchDocs_Response_403 = Error_APIKEY_MISMATCH;
declare type GetErrors_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetErrors_Response_403 = Error_APIKEY_MISMATCH;
interface CondensedProjectData {
  name?: string;
  subdomain?: string;
  jwtSecret?: string;
  /**
   * The base URL for the project. If the project is not running under a custom domain, it will be `https://projectSubdomain.readme.io`, otherwise it can either be or `https://example.com` or, in the case of an enterprise child project `https://example.com/projectSubdomain`.
   */
  baseUrl?: string;
  plan?: string;
  [k: string]: unknown;
}
declare type GetProject_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetProject_Response_403 = Error_APIKEY_MISMATCH;
declare type GetVersions_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetVersions_Response_403 = Error_APIKEY_MISMATCH;
interface Version {
  /**
   * Semantic Version
   */
  version: string;
  /**
   * Dubbed name of version
   */
  codename?: string;
  /**
   * Semantic Version to use as the base fork
   */
  from: string;
  /**
   * Should this be the **main** version
   */
  is_stable?: boolean;
  is_beta?: boolean;
  /**
   * Should this be publically accessible?
   */
  is_hidden?: boolean;
  /**
   * Should this be deprecated? Only allowed in PUT operations
   */
  is_deprecated?: boolean;
  [k: string]: unknown;
}
declare type CreateVersion_Response_400 = Error_VERSION_EMPTY | Error_VERSION_DUPLICATE | Error_VERSION_FORK_EMPTY;
interface Error_VERSION_DUPLICATE {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
interface Error_VERSION_FORK_EMPTY {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type CreateVersion_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type CreateVersion_Response_403 = Error_APIKEY_MISMATCH;
interface Error_VERSION_FORK_NOTFOUND {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type GetVersionMetadataParam = {
  /**
   * Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).
   */
  versionId: string;
  [k: string]: unknown;
};
declare type GetVersion_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type GetVersion_Response_403 = Error_APIKEY_MISMATCH;
declare type UpdateVersionMetadataParam = {
  /**
   * Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).
   */
  versionId: string;
  [k: string]: unknown;
};
interface Error_VERSION_CANT_DEMOTE_STABLE {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type UpdateVersion_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type UpdateVersion_Response_403 = Error_APIKEY_MISMATCH;
declare type DeleteVersionMetadataParam = {
  /**
   * Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).
   */
  versionId: string;
  [k: string]: unknown;
};
interface Error_VERSION_CANT_REMOVE_STABLE {
  /**
   * An error code unique to the error received.
   */
  error?: string;
  /**
   * The reason why the error occured.
   */
  message?: string;
  /**
   * A helpful suggestion for how to alleviate the error.
   */
  suggestion?: string;
  /**
   * A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.
   */
  docs?: string;
  /**
   * Information on where you can receive additional assistance from our wonderful support team.
   */
  help?: string;
  /**
   * A short poem we wrote you about your error.
   */
  poem?: string[];
  [k: string]: unknown;
}
declare type DeleteVersion_Response_401 = Error_APIKEY_EMPTY | Error_APIKEY_NOTFOUND;
declare type DeleteVersion_Response_403 = Error_APIKEY_MISMATCH;
export {};
