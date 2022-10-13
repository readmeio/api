import type { FromSchema } from 'json-schema-to-ts';
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
    metadata: GetApiRegistryMetadataParam
  ): Promise<GetApiRegistryResponse200 | ErrorRegistryNotfound>;
  /**
   * Get API specification metadata
   *
   * @summary Get metadata
   */
  get(
    path: '/api-specification',
    metadata?: GetApiSpecificationMetadataParam
  ): Promise<
    | GetApiSpecificationResponse200
    | ErrorVersionEmpty
    | GetApiSpecificationResponse401
    | GetApiSpecificationResponse403
    | ErrorVersionNotfound
  >;
  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  get(path: '/apply'): Promise<GetOpenRolesResponse200>;
  /**
   * Returns all the categories for a specified version
   *
   * @summary Get all categories
   */
  get(
    path: '/categories',
    metadata?: GetCategoriesMetadataParam
  ): Promise<GetCategoriesResponse200>;
  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  get(
    path: '/categories/{slug}',
    metadata: GetCategoryMetadataParam
  ): Promise<ErrorCategoryNotfound>;
  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  get(
    path: '/categories/{slug}/docs',
    metadata: GetCategoryDocsMetadataParam
  ): Promise<ErrorCategoryNotfound>;
  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  get(
    path: '/changelogs',
    metadata?: GetChangelogsMetadataParam
  ): Promise<GetChangelogsResponse200>;
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
  ): Promise<GetCustomPagesResponse200 | GetCustomPagesResponse401 | GetCustomPagesResponse403>;
  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  get(
    path: '/custompages/{slug}',
    metadata: GetCustomPageMetadataParam
  ): Promise<GetCustomPageResponse401 | GetCustomPageResponse403 | ErrorCustompageNotfound>;
  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  get(
    path: '/docs/{slug}',
    metadata: GetDocMetadataParam
  ): Promise<GetDocResponse401 | GetDocResponse403 | ErrorDocNotfound>;
  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  get(path: '/errors'): Promise<GetErrorsResponse401 | GetErrorsResponse403>;
  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  get(path: '/'): Promise<CondensedProjectData | GetProjectResponse401 | GetProjectResponse403>;
  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  get(path: '/version'): Promise<GetVersionsResponse401 | GetVersionsResponse403>;
  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  get(
    path: '/version/{versionId}',
    metadata: GetVersionMetadataParam
  ): Promise<GetVersionResponse401 | GetVersionResponse403 | ErrorVersionNotfound>;
  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/docs/automatically-sync-api-specification-with-github
   *
   * @summary Upload specification
   */
  post(
    path: '/api-specification',
    body: UploadApiSpecificationBodyParam,
    metadata?: UploadApiSpecificationMetadataParam
  ): Promise<
    | UploadApiSpecificationResponse400
    | UploadApiSpecificationResponse401
    | UploadApiSpecificationResponse403
    | ErrorSpecTimeout
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
  post(
    path: '/categories',
    body: Category,
    metadata?: CreateCategoryMetadataParam
  ): Promise<ErrorCategoryInvalid>;
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
  ): Promise<ErrorCustompageInvalid | CreateCustomPageResponse401 | CreateCustomPageResponse403>;
  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  post(
    path: '/docs',
    body: Doc,
    metadata?: CreateDocMetadataParam
  ): Promise<ErrorDocInvalid | CreateDocResponse401 | CreateDocResponse403>;
  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  post(
    path: '/docs/search',
    metadata: SearchDocsMetadataParam
  ): Promise<SearchDocsResponse401 | SearchDocsResponse403>;
  /**
   * Create a new version
   *
   * @summary Create version
   */
  post(
    path: '/version',
    body: Version
  ): Promise<
    | CreateVersionResponse400
    | CreateVersionResponse401
    | CreateVersionResponse403
    | ErrorVersionForkNotfound
  >;
  /**
   * Update an API specification in ReadMe
   *
   * @summary Update specification
   */
  put(
    path: '/api-specification/{id}',
    body: UpdateApiSpecificationBodyParam,
    metadata: UpdateApiSpecificationMetadataParam
  ): Promise<
    | UpdateApiSpecificationResponse400
    | UpdateApiSpecificationResponse401
    | UpdateApiSpecificationResponse403
    | ErrorSpecTimeout
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
  ): Promise<ErrorCategoryInvalid | ErrorCategoryNotfound>;
  /**
   * Update a changelog with this slug
   *
   * @summary Update changelog
   */
  put<T = unknown>(
    path: '/changelogs/{slug}',
    body: Changelog,
    metadata: UpdateChangelogMetadataParam
  ): Promise<T>;
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
    | ErrorCustompageInvalid
    | UpdateCustomPageResponse401
    | UpdateCustomPageResponse403
    | ErrorCustompageNotfound
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
  ): Promise<ErrorDocInvalid | UpdateDocResponse401 | UpdateDocResponse403 | ErrorDocNotfound>;
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
    | ErrorVersionCantDemoteStable
    | UpdateVersionResponse401
    | UpdateVersionResponse403
    | ErrorVersionNotfound
  >;
  /**
   * Delete an API specification in ReadMe
   *
   * @summary Delete specification
   */
  delete(
    path: '/api-specification/{id}',
    metadata: DeleteApiSpecificationMetadataParam
  ): Promise<
    | ErrorSpecIdInvalid
    | DeleteApiSpecificationResponse401
    | DeleteApiSpecificationResponse403
    | ErrorSpecNotfound
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
    metadata: DeleteCategoryMetadataParam
  ): Promise<ErrorCategoryNotfound>;
  /**
   * Delete the changelog with this slug
   *
   * @summary Delete changelog
   */
  delete<T = unknown>(
    path: '/changelogs/{slug}',
    metadata: DeleteChangelogMetadataParam
  ): Promise<T>;
  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  delete(
    path: '/custompages/{slug}',
    metadata: DeleteCustomPageMetadataParam
  ): Promise<DeleteCustomPageResponse401 | DeleteCustomPageResponse403 | ErrorCustompageNotfound>;
  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  delete(
    path: '/docs/{slug}',
    metadata: DeleteDocMetadataParam
  ): Promise<DeleteDocResponse401 | DeleteDocResponse403 | ErrorDocNotfound>;
  /**
   * Delete a version
   *
   * @summary Delete version
   */
  delete(
    path: '/version/{versionId}',
    metadata: DeleteVersionMetadataParam
  ): Promise<
    | ErrorVersionCantRemoveStable
    | DeleteVersionResponse401
    | DeleteVersionResponse403
    | ErrorVersionNotfound
  >;
  /**
   * Get an API definition file that's been uploaded to ReadMe
   *
   * @summary Retrieve an entry from the API Registry
   */
  getAPIRegistry(
    metadata: GetApiRegistryMetadataParam
  ): Promise<GetApiRegistryResponse200 | ErrorRegistryNotfound>;
  /**
   * Get API specification metadata
   *
   * @summary Get metadata
   */
  getAPISpecification(
    metadata?: GetApiSpecificationMetadataParam
  ): Promise<
    | GetApiSpecificationResponse200
    | ErrorVersionEmpty
    | GetApiSpecificationResponse401
    | GetApiSpecificationResponse403
    | ErrorVersionNotfound
  >;
  /**
   * Upload an API specification to ReadMe. Or, to use a newer solution see https://docs.readme.com/docs/automatically-sync-api-specification-with-github
   *
   * @summary Upload specification
   */
  uploadAPISpecification(
    body: UploadApiSpecificationBodyParam,
    metadata?: UploadApiSpecificationMetadataParam
  ): Promise<
    | UploadApiSpecificationResponse400
    | UploadApiSpecificationResponse401
    | UploadApiSpecificationResponse403
    | ErrorSpecTimeout
  >;
  /**
   * Update an API specification in ReadMe
   *
   * @summary Update specification
   */
  updateAPISpecification(
    body: UpdateApiSpecificationBodyParam,
    metadata: UpdateApiSpecificationMetadataParam
  ): Promise<
    | UpdateApiSpecificationResponse400
    | UpdateApiSpecificationResponse401
    | UpdateApiSpecificationResponse403
    | ErrorSpecTimeout
  >;
  /**
   * Delete an API specification in ReadMe
   *
   * @summary Delete specification
   */
  deleteAPISpecification(
    metadata: DeleteApiSpecificationMetadataParam
  ): Promise<
    | ErrorSpecIdInvalid
    | DeleteApiSpecificationResponse401
    | DeleteApiSpecificationResponse403
    | ErrorSpecNotfound
  >;
  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  getOpenRoles(): Promise<GetOpenRolesResponse200>;
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
  getCategories(metadata?: GetCategoriesMetadataParam): Promise<GetCategoriesResponse200>;
  /**
   * Create a new category inside of this project
   *
   * @summary Create category
   */
  createCategory(
    body: Category,
    metadata?: CreateCategoryMetadataParam
  ): Promise<ErrorCategoryInvalid>;
  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  getCategory(metadata: GetCategoryMetadataParam): Promise<ErrorCategoryNotfound>;
  /**
   * Change the properties of a category.
   *
   * @summary Update category
   */
  updateCategory(
    body: Category,
    metadata: UpdateCategoryMetadataParam
  ): Promise<ErrorCategoryInvalid | ErrorCategoryNotfound>;
  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   */
  deleteCategory(metadata: DeleteCategoryMetadataParam): Promise<ErrorCategoryNotfound>;
  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  getCategoryDocs(metadata: GetCategoryDocsMetadataParam): Promise<ErrorCategoryNotfound>;
  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  getChangelogs(metadata?: GetChangelogsMetadataParam): Promise<GetChangelogsResponse200>;
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
  ): Promise<GetCustomPagesResponse200 | GetCustomPagesResponse401 | GetCustomPagesResponse403>;
  /**
   * Create a new custom page inside of this project
   *
   * @summary Create custom page
   */
  createCustomPage(
    body: CustomPage
  ): Promise<ErrorCustompageInvalid | CreateCustomPageResponse401 | CreateCustomPageResponse403>;
  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  getCustomPage(
    metadata: GetCustomPageMetadataParam
  ): Promise<GetCustomPageResponse401 | GetCustomPageResponse403 | ErrorCustompageNotfound>;
  /**
   * Update a custom page with this slug
   *
   * @summary Update custom page
   */
  updateCustomPage(
    body: CustomPage,
    metadata: UpdateCustomPageMetadataParam
  ): Promise<
    | ErrorCustompageInvalid
    | UpdateCustomPageResponse401
    | UpdateCustomPageResponse403
    | ErrorCustompageNotfound
  >;
  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  deleteCustomPage(
    metadata: DeleteCustomPageMetadataParam
  ): Promise<DeleteCustomPageResponse401 | DeleteCustomPageResponse403 | ErrorCustompageNotfound>;
  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  getDoc(
    metadata: GetDocMetadataParam
  ): Promise<GetDocResponse401 | GetDocResponse403 | ErrorDocNotfound>;
  /**
   * Update a doc with this slug
   *
   * @summary Update doc
   */
  updateDoc(
    body: Doc,
    metadata: UpdateDocMetadataParam
  ): Promise<ErrorDocInvalid | UpdateDocResponse401 | UpdateDocResponse403 | ErrorDocNotfound>;
  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  deleteDoc(
    metadata: DeleteDocMetadataParam
  ): Promise<DeleteDocResponse401 | DeleteDocResponse403 | ErrorDocNotfound>;
  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  createDoc(
    body: Doc,
    metadata?: CreateDocMetadataParam
  ): Promise<ErrorDocInvalid | CreateDocResponse401 | CreateDocResponse403>;
  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  searchDocs(
    metadata: SearchDocsMetadataParam
  ): Promise<SearchDocsResponse401 | SearchDocsResponse403>;
  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  getErrors(): Promise<GetErrorsResponse401 | GetErrorsResponse403>;
  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  getProject(): Promise<CondensedProjectData | GetProjectResponse401 | GetProjectResponse403>;
  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  getVersions(): Promise<GetVersionsResponse401 | GetVersionsResponse403>;
  /**
   * Create a new version
   *
   * @summary Create version
   */
  createVersion(
    body: Version
  ): Promise<
    | CreateVersionResponse400
    | CreateVersionResponse401
    | CreateVersionResponse403
    | ErrorVersionForkNotfound
  >;
  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  getVersion(
    metadata: GetVersionMetadataParam
  ): Promise<GetVersionResponse401 | GetVersionResponse403 | ErrorVersionNotfound>;
  /**
   * Update an existing version
   *
   * @summary Update version
   */
  updateVersion(
    body: Version,
    metadata: UpdateVersionMetadataParam
  ): Promise<
    | ErrorVersionCantDemoteStable
    | UpdateVersionResponse401
    | UpdateVersionResponse403
    | ErrorVersionNotfound
  >;
  /**
   * Delete a version
   *
   * @summary Delete version
   */
  deleteVersion(
    metadata: DeleteVersionMetadataParam
  ): Promise<
    | ErrorVersionCantRemoveStable
    | DeleteVersionResponse401
    | DeleteVersionResponse403
    | ErrorVersionNotfound
  >;
}
declare const createSDK: SDK;
export default createSDK;
interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
declare const schemas: {
  readonly getAPIRegistry: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly uuid: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'An API Registry UUID. This can be found by navigating to your API Reference page and viewing code snippets for Node with the `api` library.';
            };
          };
          readonly required: readonly ['uuid'];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'object';
        readonly additionalProperties: true;
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly $ref: {
    readonly ErrorRegistryNotfound: {
      readonly title: 'error_REGISTRY_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_REGISTRY_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'REGISTRY_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorVersionEmpty: {
      readonly title: 'error_VERSION_EMPTY';
      readonly 'x-readme-ref-name': 'error_VERSION_EMPTY';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'VERSION_EMPTY';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorVersionNotfound: {
      readonly title: 'error_VERSION_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_VERSION_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'VERSION_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorSpecTimeout: {
      readonly title: 'error_SPEC_TIMEOUT';
      readonly 'x-readme-ref-name': 'error_SPEC_TIMEOUT';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'SPEC_TIMEOUT';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorSpecIdInvalid: {
      readonly title: 'error_SPEC_ID_INVALID';
      readonly 'x-readme-ref-name': 'error_SPEC_ID_INVALID';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'SPEC_ID_INVALID';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorSpecNotfound: {
      readonly title: 'error_SPEC_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_SPEC_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'SPEC_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly Apply: {
      readonly type: 'object';
      readonly properties: {
        readonly name: {
          readonly type: 'string';
          readonly minLength: 1;
          readonly description: 'Your full name';
          readonly default: 'Your Name';
        };
        readonly email: {
          readonly type: 'string';
          readonly format: 'email';
          readonly description: 'A valid email we can reach you at';
          readonly default: 'you@example.com';
        };
        readonly job: {
          readonly type: 'string';
          readonly description: "The job you're looking to apply for (https://readme.com/careers)";
          readonly enum: readonly [
            'Content Marketing Manager',
            'Engineering Manager',
            'Head of People',
            'Marketing Campaigns Manager',
            'Marketing Designer',
            'Product Designer',
            'Product Education Manager',
            'Sales Development Representative',
            'Support Engineer (Weekends)'
          ];
          readonly default: 'Content Marketing Manager';
        };
        readonly pronouns: {
          readonly type: 'string';
          readonly description: 'Learn more at https://pronoun.is/';
        };
        readonly linkedin: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'What have you been up to the past few years?';
        };
        readonly github: {
          readonly type: 'string';
          readonly description: 'Or Bitbucket, Gitlab or anywhere else your code is hosted!';
          readonly format: 'url';
        };
        readonly coverLetter: {
          readonly type: 'string';
          readonly format: 'blob';
          readonly description: 'What should we know about you?';
        };
        readonly dontReallyApply: {
          readonly type: 'boolean';
          readonly description: 'Want to play with the API but not actually apply? Set this to true.';
          readonly default: false;
        };
      };
      readonly required: readonly ['name', 'email', 'job'];
      readonly title: 'apply';
      readonly 'x-readme-ref-name': 'apply';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly Category: {
      readonly type: 'object';
      readonly title: 'category';
      readonly 'x-readme-ref-name': 'category';
      readonly required: readonly ['title'];
      readonly properties: {
        readonly title: {
          readonly type: 'string';
          readonly description: 'A short title for the category. This is what will show in the sidebar.';
        };
        readonly type: {
          readonly type: 'string';
          readonly enum: readonly ['reference', 'guide'];
          readonly default: 'guide';
          readonly description: 'A category can be part of your reference or guide documentation, which is determined by this field.';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorCategoryInvalid: {
      readonly title: 'error_CATEGORY_INVALID';
      readonly 'x-readme-ref-name': 'error_CATEGORY_INVALID';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'CATEGORY_INVALID';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorCategoryNotfound: {
      readonly title: 'error_CATEGORY_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_CATEGORY_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'CATEGORY_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly Changelog: {
      readonly type: 'object';
      readonly properties: {
        readonly title: {
          readonly type: 'string';
          readonly description: 'Title of the changelog';
        };
        readonly type: {
          readonly type: 'string';
          readonly enum: readonly ['', 'added', 'fixed', 'improved', 'deprecated', 'removed'];
        };
        readonly body: {
          readonly type: 'string';
          readonly description: 'Body content of the changelog';
        };
        readonly hidden: {
          readonly type: 'boolean';
          readonly description: 'Visibility of the changelog';
          readonly default: true;
        };
      };
      readonly required: readonly ['title', 'body'];
      readonly title: 'changelog';
      readonly 'x-readme-ref-name': 'changelog';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly CustomPage: {
      readonly type: 'object';
      readonly properties: {
        readonly title: {
          readonly type: 'string';
          readonly description: 'Title of the custom page';
        };
        readonly body: {
          readonly description: 'Body formatted in Markdown (displayed by default).';
          readonly type: 'string';
        };
        readonly html: {
          readonly description: 'Body formatted in HTML (sanitized, only displayed if `htmlmode` is **true**).';
          readonly type: 'string';
        };
        readonly htmlmode: {
          readonly description: '**true** if `html` should be displayed, **false** if `body` should be displayed.';
          readonly type: 'boolean';
          readonly default: false;
        };
        readonly hidden: {
          readonly type: 'boolean';
          readonly description: 'Visibility of the custom page';
          readonly default: true;
        };
      };
      readonly required: readonly ['title'];
      readonly title: 'customPage';
      readonly 'x-readme-ref-name': 'customPage';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorCustompageInvalid: {
      readonly title: 'error_CUSTOMPAGE_INVALID';
      readonly 'x-readme-ref-name': 'error_CUSTOMPAGE_INVALID';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'CUSTOMPAGE_INVALID';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorCustompageNotfound: {
      readonly title: 'error_CUSTOMPAGE_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_CUSTOMPAGE_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'CUSTOMPAGE_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorDocNotfound: {
      readonly title: 'error_DOC_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_DOC_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'DOC_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly Doc: {
      readonly type: 'object';
      readonly properties: {
        readonly title: {
          readonly type: 'string';
          readonly description: 'Title of the page';
        };
        readonly type: {
          readonly type: 'string';
          readonly description: 'Type of the page. The available types all show up under the /docs/ URL path of your docs project (also known as the "guides" section). Can be "basic" (most common), "error" (page desribing an API error), or "link" (page that redirects to an external link)';
          readonly enum: readonly ['basic', 'error', 'link'];
        };
        readonly body: {
          readonly type: 'string';
          readonly description: 'Body content of the page, formatted in ReadMe or GitHub flavored Markdown. Accepts long page content, for example, greater than 100k characters';
        };
        readonly category: {
          readonly type: 'string';
          readonly description: 'Category ID of the page, which you can get through https://docs.readme.com/reference/categories#getcategory ';
        };
        readonly hidden: {
          readonly type: 'boolean';
          readonly description: 'Visibility of the page';
          readonly default: true;
        };
        readonly order: {
          readonly type: 'integer';
          readonly description: 'The position of the page in your project sidebar.';
          readonly default: 999;
        };
        readonly parentDoc: {
          readonly type: 'string';
          readonly description: 'For a subpage, specify the parent doc ID, which you can get through https://docs.readme.com/reference/docs#getdoc';
        };
        readonly error: {
          readonly type: 'object';
          readonly properties: {
            readonly code: {
              readonly type: 'string';
              readonly description: 'The error code for docs with the "error" type';
            };
          };
        };
      };
      readonly required: readonly ['title', 'category'];
      readonly title: 'doc';
      readonly 'x-readme-ref-name': 'doc';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorDocInvalid: {
      readonly title: 'error_DOC_INVALID';
      readonly 'x-readme-ref-name': 'error_DOC_INVALID';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'DOC_INVALID';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly CondensedProjectData: {
      readonly type: 'object';
      readonly properties: {
        readonly name: {
          readonly type: 'string';
        };
        readonly subdomain: {
          readonly type: 'string';
        };
        readonly jwtSecret: {
          readonly type: 'string';
        };
        readonly baseUrl: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'The base URL for the project. If the project is not running under a custom domain, it will be `https://projectSubdomain.readme.io`, otherwise it can either be or `https://example.com` or, in the case of an enterprise child project `https://example.com/projectSubdomain`.';
        };
        readonly plan: {
          readonly type: 'string';
        };
      };
      readonly title: 'condensedProjectData';
      readonly 'x-readme-ref-name': 'condensedProjectData';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly Version: {
      readonly type: 'object';
      readonly properties: {
        readonly version: {
          readonly type: 'string';
          readonly description: 'Semantic Version';
        };
        readonly codename: {
          readonly type: 'string';
          readonly description: 'Dubbed name of version';
        };
        readonly from: {
          readonly type: 'string';
          readonly description: 'Semantic Version to use as the base fork';
        };
        readonly is_stable: {
          readonly type: 'boolean';
          readonly description: 'Should this be the **main** version';
        };
        readonly is_beta: {
          readonly type: 'boolean';
          readonly default: true;
        };
        readonly is_hidden: {
          readonly type: 'boolean';
          readonly description: 'Should this be publically accessible?';
        };
        readonly is_deprecated: {
          readonly type: 'boolean';
          readonly description: 'Should this be deprecated? Only allowed in PUT operations';
        };
      };
      readonly required: readonly ['version', 'from'];
      readonly title: 'version';
      readonly 'x-readme-ref-name': 'version';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorVersionForkNotfound: {
      readonly title: 'error_VERSION_FORK_NOTFOUND';
      readonly 'x-readme-ref-name': 'error_VERSION_FORK_NOTFOUND';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'VERSION_FORK_NOTFOUND';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorVersionCantDemoteStable: {
      readonly title: 'error_VERSION_CANT_DEMOTE_STABLE';
      readonly 'x-readme-ref-name': 'error_VERSION_CANT_DEMOTE_STABLE';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'VERSION_CANT_DEMOTE_STABLE';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ErrorVersionCantRemoveStable: {
      readonly title: 'error_VERSION_CANT_REMOVE_STABLE';
      readonly 'x-readme-ref-name': 'error_VERSION_CANT_REMOVE_STABLE';
      readonly type: 'object';
      readonly properties: {
        readonly error: {
          readonly type: 'string';
          readonly description: 'An error code unique to the error received.';
          readonly default: 'VERSION_CANT_REMOVE_STABLE';
        };
        readonly message: {
          readonly type: 'string';
          readonly description: 'The reason why the error occured.';
        };
        readonly suggestion: {
          readonly type: 'string';
          readonly description: 'A helpful suggestion for how to alleviate the error.';
        };
        readonly docs: {
          readonly type: 'string';
          readonly format: 'url';
          readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
          readonly examples: readonly [
            'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
          ];
        };
        readonly help: {
          readonly type: 'string';
          readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
          readonly examples: readonly ['If you need help, email support@readme.io'];
        };
        readonly poem: {
          readonly type: 'array';
          readonly description: 'A short poem we wrote you about your error.';
          readonly items: {
            readonly type: 'string';
          };
          readonly examples: readonly [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!"
          ];
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
  readonly getAPISpecification: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly perPage: {
              readonly type: 'integer';
              readonly default: 10;
              readonly minimum: 1;
              readonly maximum: 100;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Number of items to include in pagination (up to 100, defaults to 10)';
            };
            readonly page: {
              readonly type: 'integer';
              readonly default: 1;
              readonly minimum: 1;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Used to specify further pages (starts at 1)';
            };
          };
          readonly required: readonly [];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'object';
        readonly properties: {
          readonly Link: {
            readonly type: 'string';
            readonly description: 'Pagination information. See https://docs.readme.com/reference/pagination for more information.';
          };
          readonly 'x-total-count': {
            readonly type: 'string';
            readonly description: 'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.';
          };
        };
      };
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly uploadAPISpecification: {
    readonly body: {
      readonly type: 'object';
      readonly properties: {
        readonly spec: {
          readonly description: 'OpenAPI/Swagger file';
          readonly type: 'string';
          readonly format: 'binary';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '400': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_SPEC_FILE_EMPTY';
            readonly 'x-readme-ref-name': 'error_SPEC_FILE_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_FILE_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_INVALID';
            readonly 'x-readme-ref-name': 'error_SPEC_INVALID';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_INVALID';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_INVALID_SCHEMA';
            readonly 'x-readme-ref-name': 'error_SPEC_INVALID_SCHEMA';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_INVALID_SCHEMA';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_VERSION_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_SPEC_VERSION_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_VERSION_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly updateAPISpecification: {
    readonly body: {
      readonly type: 'object';
      readonly properties: {
        readonly spec: {
          readonly description: 'OpenAPI/Swagger file';
          readonly type: 'string';
          readonly format: 'binary';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly id: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.';
            };
          };
          readonly required: readonly ['id'];
        }
      ];
    };
    readonly response: {
      readonly '400': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_SPEC_FILE_EMPTY';
            readonly 'x-readme-ref-name': 'error_SPEC_FILE_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_FILE_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_ID_DUPLICATE';
            readonly 'x-readme-ref-name': 'error_SPEC_ID_DUPLICATE';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_ID_DUPLICATE';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_ID_INVALID';
            readonly 'x-readme-ref-name': 'error_SPEC_ID_INVALID';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_ID_INVALID';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_INVALID';
            readonly 'x-readme-ref-name': 'error_SPEC_INVALID';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_INVALID';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_INVALID_SCHEMA';
            readonly 'x-readme-ref-name': 'error_SPEC_INVALID_SCHEMA';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_INVALID_SCHEMA';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_SPEC_VERSION_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_SPEC_VERSION_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'SPEC_VERSION_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly deleteAPISpecification: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly id: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.';
            };
          };
          readonly required: readonly ['id'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getOpenRoles: {
    readonly response: {
      readonly '200': {
        readonly type: 'array';
        readonly items: {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly description: 'A slugified version of the job opening title.';
              readonly examples: readonly ['api-engineer'];
            };
            readonly title: {
              readonly type: 'string';
              readonly description: 'The job opening position.';
              readonly examples: readonly ['API Engineer'];
            };
            readonly description: {
              readonly type: 'string';
              readonly description: 'The description for this open position. This content is formatted as HTML.';
            };
            readonly pullquote: {
              readonly type: 'string';
              readonly description: 'A short pullquote for the open position.';
              readonly examples: readonly [
                'Deeply knowledgeable of the web, HTTP, and the API space.'
              ];
            };
            readonly location: {
              readonly type: 'string';
              readonly description: 'Where this position is located at.';
              readonly examples: readonly ['Remote'];
            };
            readonly department: {
              readonly type: 'string';
              readonly description: "The internal organization you'll be working in.";
              readonly examples: readonly ['Engineering'];
            };
            readonly url: {
              readonly type: 'string';
              readonly format: 'url';
              readonly description: 'The place where you can apply for the position!';
            };
          };
          readonly title: 'jobOpening';
          readonly 'x-readme-ref-name': 'jobOpening';
        };
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getCategories: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly perPage: {
              readonly type: 'integer';
              readonly default: 10;
              readonly minimum: 1;
              readonly maximum: 100;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Number of items to include in pagination (up to 100, defaults to 10)';
            };
            readonly page: {
              readonly type: 'integer';
              readonly default: 1;
              readonly minimum: 1;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Used to specify further pages (starts at 1)';
            };
          };
          readonly required: readonly [];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'object';
        readonly properties: {
          readonly Link: {
            readonly type: 'string';
            readonly description: 'Pagination information. See https://docs.readme.com/reference/pagination for more information.';
          };
          readonly 'x-total-count': {
            readonly type: 'string';
            readonly description: 'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.';
          };
        };
      };
    };
  };
  readonly createCategory: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
  };
  readonly getCategory: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['getting-started'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
  };
  readonly updateCategory: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['getting-started'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
  };
  readonly deleteCategory: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['getting-started'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
  };
  readonly getCategoryDocs: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['getting-started'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
  };
  readonly getChangelogs: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly perPage: {
              readonly type: 'integer';
              readonly default: 10;
              readonly minimum: 1;
              readonly maximum: 100;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Number of items to include in pagination (up to 100, defaults to 10)';
            };
            readonly page: {
              readonly type: 'integer';
              readonly default: 1;
              readonly minimum: 1;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Used to specify further pages (starts at 1)';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'object';
        readonly properties: {
          readonly Link: {
            readonly type: 'string';
            readonly description: 'Pagination information. See https://docs.readme.com/reference/pagination for more information.';
          };
          readonly 'x-total-count': {
            readonly type: 'string';
            readonly description: 'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.';
          };
        };
      };
    };
  };
  readonly getChangelog: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"';
            };
          };
          readonly required: readonly ['slug'];
        }
      ];
    };
  };
  readonly updateChangelog: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"';
            };
          };
          readonly required: readonly ['slug'];
        }
      ];
    };
  };
  readonly deleteChangelog: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"';
            };
          };
          readonly required: readonly ['slug'];
        }
      ];
    };
  };
  readonly getCustomPages: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly perPage: {
              readonly type: 'integer';
              readonly default: 10;
              readonly minimum: 1;
              readonly maximum: 100;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Number of items to include in pagination (up to 100, defaults to 10)';
            };
            readonly page: {
              readonly type: 'integer';
              readonly default: 1;
              readonly minimum: 1;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Used to specify further pages (starts at 1)';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'object';
        readonly properties: {
          readonly Link: {
            readonly type: 'string';
            readonly description: 'Pagination information. See https://docs.readme.com/reference/pagination for more information.';
          };
          readonly 'x-total-count': {
            readonly type: 'string';
            readonly description: 'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.';
          };
        };
      };
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly createCustomPage: {
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getCustomPage: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly updateCustomPage: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly deleteCustomPage: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"';
            };
          };
          readonly required: readonly ['slug'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getDoc: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['new-features'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly updateDoc: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['new-features'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly deleteDoc: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly slug: {
              readonly type: 'string';
              readonly examples: readonly ['new-features'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"';
            };
          };
          readonly required: readonly ['slug'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly createDoc: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly searchDocs: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly search: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Search string to look for';
            };
          };
          readonly required: readonly ['search'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly 'x-readme-version': {
              readonly type: 'string';
              readonly examples: readonly ['v3.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getErrors: {
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getProject: {
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getVersions: {
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly createVersion: {
    readonly response: {
      readonly '400': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_VERSION_EMPTY';
            readonly 'x-readme-ref-name': 'error_VERSION_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'VERSION_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_VERSION_DUPLICATE';
            readonly 'x-readme-ref-name': 'error_VERSION_DUPLICATE';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'VERSION_DUPLICATE';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_VERSION_FORK_EMPTY';
            readonly 'x-readme-ref-name': 'error_VERSION_FORK_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'VERSION_FORK_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getVersion: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly versionId: {
              readonly type: 'string';
              readonly examples: readonly ['v1.0.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).';
            };
          };
          readonly required: readonly ['versionId'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly updateVersion: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly versionId: {
              readonly type: 'string';
              readonly examples: readonly ['v1.0.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).';
            };
          };
          readonly required: readonly ['versionId'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly deleteVersion: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly versionId: {
              readonly type: 'string';
              readonly examples: readonly ['v1.0.0'];
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).';
            };
          };
          readonly required: readonly ['versionId'];
        }
      ];
    };
    readonly response: {
      readonly '401': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_EMPTY';
            readonly 'x-readme-ref-name': 'error_APIKEY_EMPTY';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_EMPTY';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          },
          {
            readonly title: 'error_APIKEY_NOTFOUND';
            readonly 'x-readme-ref-name': 'error_APIKEY_NOTFOUND';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_NOTFOUND';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
      readonly '403': {
        readonly oneOf: readonly [
          {
            readonly title: 'error_APIKEY_MISMATCH';
            readonly 'x-readme-ref-name': 'error_APIKEY_MISMATCH';
            readonly type: 'object';
            readonly properties: {
              readonly error: {
                readonly type: 'string';
                readonly description: 'An error code unique to the error received.';
                readonly default: 'APIKEY_MISMATCH';
              };
              readonly message: {
                readonly type: 'string';
                readonly description: 'The reason why the error occured.';
              };
              readonly suggestion: {
                readonly type: 'string';
                readonly description: 'A helpful suggestion for how to alleviate the error.';
              };
              readonly docs: {
                readonly type: 'string';
                readonly format: 'url';
                readonly description: 'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.';
                readonly examples: readonly [
                  'https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'
                ];
              };
              readonly help: {
                readonly type: 'string';
                readonly description: 'Information on where you can receive additional assistance from our wonderful support team.';
                readonly examples: readonly ['If you need help, email support@readme.io'];
              };
              readonly poem: {
                readonly type: 'array';
                readonly description: 'A short poem we wrote you about your error.';
                readonly items: {
                  readonly type: 'string';
                };
                readonly examples: readonly [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!"
                ];
              };
            };
          }
        ];
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
};
declare type GetApiRegistryMetadataParam = FromSchema<typeof schemas.getAPIRegistry.metadata>;
declare type GetApiRegistryResponse200 = FromSchema<typeof schemas.getAPIRegistry.response['200']>;
declare type ErrorRegistryNotfound = FromSchema<typeof schemas.$ref.ErrorRegistryNotfound>;
declare type GetApiSpecificationMetadataParam = FromSchema<
  typeof schemas.getAPISpecification.metadata
>;
declare type GetApiSpecificationResponse200 = FromSchema<
  typeof schemas.getAPISpecification.response['200']
>;
declare type ErrorVersionEmpty = FromSchema<typeof schemas.$ref.ErrorVersionEmpty>;
declare type GetApiSpecificationResponse401 = FromSchema<
  typeof schemas.getAPISpecification.response['401']
>;
declare type GetApiSpecificationResponse403 = FromSchema<
  typeof schemas.getAPISpecification.response['403']
>;
declare type ErrorVersionNotfound = FromSchema<typeof schemas.$ref.ErrorVersionNotfound>;
declare type UploadApiSpecificationBodyParam = FromSchema<
  typeof schemas.uploadAPISpecification.body
>;
declare type UploadApiSpecificationMetadataParam = FromSchema<
  typeof schemas.uploadAPISpecification.metadata
>;
declare type UploadApiSpecificationResponse400 = FromSchema<
  typeof schemas.uploadAPISpecification.response['400']
>;
declare type UploadApiSpecificationResponse401 = FromSchema<
  typeof schemas.uploadAPISpecification.response['401']
>;
declare type UploadApiSpecificationResponse403 = FromSchema<
  typeof schemas.uploadAPISpecification.response['403']
>;
declare type ErrorSpecTimeout = FromSchema<typeof schemas.$ref.ErrorSpecTimeout>;
declare type UpdateApiSpecificationBodyParam = FromSchema<
  typeof schemas.updateAPISpecification.body
>;
declare type UpdateApiSpecificationMetadataParam = FromSchema<
  typeof schemas.updateAPISpecification.metadata
>;
declare type UpdateApiSpecificationResponse400 = FromSchema<
  typeof schemas.updateAPISpecification.response['400']
>;
declare type UpdateApiSpecificationResponse401 = FromSchema<
  typeof schemas.updateAPISpecification.response['401']
>;
declare type UpdateApiSpecificationResponse403 = FromSchema<
  typeof schemas.updateAPISpecification.response['403']
>;
declare type DeleteApiSpecificationMetadataParam = FromSchema<
  typeof schemas.deleteAPISpecification.metadata
>;
declare type ErrorSpecIdInvalid = FromSchema<typeof schemas.$ref.ErrorSpecIdInvalid>;
declare type DeleteApiSpecificationResponse401 = FromSchema<
  typeof schemas.deleteAPISpecification.response['401']
>;
declare type DeleteApiSpecificationResponse403 = FromSchema<
  typeof schemas.deleteAPISpecification.response['403']
>;
declare type ErrorSpecNotfound = FromSchema<typeof schemas.$ref.ErrorSpecNotfound>;
declare type GetOpenRolesResponse200 = FromSchema<typeof schemas.getOpenRoles.response['200']>;
declare type Apply = FromSchema<typeof schemas.$ref.Apply>;
declare type GetCategoriesMetadataParam = FromSchema<typeof schemas.getCategories.metadata>;
declare type GetCategoriesResponse200 = FromSchema<typeof schemas.getCategories.response['200']>;
declare type Category = FromSchema<typeof schemas.$ref.Category>;
declare type CreateCategoryMetadataParam = FromSchema<typeof schemas.createCategory.metadata>;
declare type ErrorCategoryInvalid = FromSchema<typeof schemas.$ref.ErrorCategoryInvalid>;
declare type GetCategoryMetadataParam = FromSchema<typeof schemas.getCategory.metadata>;
declare type ErrorCategoryNotfound = FromSchema<typeof schemas.$ref.ErrorCategoryNotfound>;
declare type UpdateCategoryMetadataParam = FromSchema<typeof schemas.updateCategory.metadata>;
declare type DeleteCategoryMetadataParam = FromSchema<typeof schemas.deleteCategory.metadata>;
declare type GetCategoryDocsMetadataParam = FromSchema<typeof schemas.getCategoryDocs.metadata>;
declare type GetChangelogsMetadataParam = FromSchema<typeof schemas.getChangelogs.metadata>;
declare type GetChangelogsResponse200 = FromSchema<typeof schemas.getChangelogs.response['200']>;
declare type Changelog = FromSchema<typeof schemas.$ref.Changelog>;
declare type GetChangelogMetadataParam = FromSchema<typeof schemas.getChangelog.metadata>;
declare type UpdateChangelogMetadataParam = FromSchema<typeof schemas.updateChangelog.metadata>;
declare type DeleteChangelogMetadataParam = FromSchema<typeof schemas.deleteChangelog.metadata>;
declare type GetCustomPagesMetadataParam = FromSchema<typeof schemas.getCustomPages.metadata>;
declare type GetCustomPagesResponse200 = FromSchema<typeof schemas.getCustomPages.response['200']>;
declare type GetCustomPagesResponse401 = FromSchema<typeof schemas.getCustomPages.response['401']>;
declare type GetCustomPagesResponse403 = FromSchema<typeof schemas.getCustomPages.response['403']>;
declare type CustomPage = FromSchema<typeof schemas.$ref.CustomPage>;
declare type ErrorCustompageInvalid = FromSchema<typeof schemas.$ref.ErrorCustompageInvalid>;
declare type CreateCustomPageResponse401 = FromSchema<
  typeof schemas.createCustomPage.response['401']
>;
declare type CreateCustomPageResponse403 = FromSchema<
  typeof schemas.createCustomPage.response['403']
>;
declare type GetCustomPageMetadataParam = FromSchema<typeof schemas.getCustomPage.metadata>;
declare type GetCustomPageResponse401 = FromSchema<typeof schemas.getCustomPage.response['401']>;
declare type GetCustomPageResponse403 = FromSchema<typeof schemas.getCustomPage.response['403']>;
declare type ErrorCustompageNotfound = FromSchema<typeof schemas.$ref.ErrorCustompageNotfound>;
declare type UpdateCustomPageMetadataParam = FromSchema<typeof schemas.updateCustomPage.metadata>;
declare type UpdateCustomPageResponse401 = FromSchema<
  typeof schemas.updateCustomPage.response['401']
>;
declare type UpdateCustomPageResponse403 = FromSchema<
  typeof schemas.updateCustomPage.response['403']
>;
declare type DeleteCustomPageMetadataParam = FromSchema<typeof schemas.deleteCustomPage.metadata>;
declare type DeleteCustomPageResponse401 = FromSchema<
  typeof schemas.deleteCustomPage.response['401']
>;
declare type DeleteCustomPageResponse403 = FromSchema<
  typeof schemas.deleteCustomPage.response['403']
>;
declare type GetDocMetadataParam = FromSchema<typeof schemas.getDoc.metadata>;
declare type GetDocResponse401 = FromSchema<typeof schemas.getDoc.response['401']>;
declare type GetDocResponse403 = FromSchema<typeof schemas.getDoc.response['403']>;
declare type ErrorDocNotfound = FromSchema<typeof schemas.$ref.ErrorDocNotfound>;
declare type Doc = FromSchema<typeof schemas.$ref.Doc>;
declare type UpdateDocMetadataParam = FromSchema<typeof schemas.updateDoc.metadata>;
declare type ErrorDocInvalid = FromSchema<typeof schemas.$ref.ErrorDocInvalid>;
declare type UpdateDocResponse401 = FromSchema<typeof schemas.updateDoc.response['401']>;
declare type UpdateDocResponse403 = FromSchema<typeof schemas.updateDoc.response['403']>;
declare type DeleteDocMetadataParam = FromSchema<typeof schemas.deleteDoc.metadata>;
declare type DeleteDocResponse401 = FromSchema<typeof schemas.deleteDoc.response['401']>;
declare type DeleteDocResponse403 = FromSchema<typeof schemas.deleteDoc.response['403']>;
declare type CreateDocMetadataParam = FromSchema<typeof schemas.createDoc.metadata>;
declare type CreateDocResponse401 = FromSchema<typeof schemas.createDoc.response['401']>;
declare type CreateDocResponse403 = FromSchema<typeof schemas.createDoc.response['403']>;
declare type SearchDocsMetadataParam = FromSchema<typeof schemas.searchDocs.metadata>;
declare type SearchDocsResponse401 = FromSchema<typeof schemas.searchDocs.response['401']>;
declare type SearchDocsResponse403 = FromSchema<typeof schemas.searchDocs.response['403']>;
declare type GetErrorsResponse401 = FromSchema<typeof schemas.getErrors.response['401']>;
declare type GetErrorsResponse403 = FromSchema<typeof schemas.getErrors.response['403']>;
declare type CondensedProjectData = FromSchema<typeof schemas.$ref.CondensedProjectData>;
declare type GetProjectResponse401 = FromSchema<typeof schemas.getProject.response['401']>;
declare type GetProjectResponse403 = FromSchema<typeof schemas.getProject.response['403']>;
declare type GetVersionsResponse401 = FromSchema<typeof schemas.getVersions.response['401']>;
declare type GetVersionsResponse403 = FromSchema<typeof schemas.getVersions.response['403']>;
declare type Version = FromSchema<typeof schemas.$ref.Version>;
declare type CreateVersionResponse400 = FromSchema<typeof schemas.createVersion.response['400']>;
declare type CreateVersionResponse401 = FromSchema<typeof schemas.createVersion.response['401']>;
declare type CreateVersionResponse403 = FromSchema<typeof schemas.createVersion.response['403']>;
declare type ErrorVersionForkNotfound = FromSchema<typeof schemas.$ref.ErrorVersionForkNotfound>;
declare type GetVersionMetadataParam = FromSchema<typeof schemas.getVersion.metadata>;
declare type GetVersionResponse401 = FromSchema<typeof schemas.getVersion.response['401']>;
declare type GetVersionResponse403 = FromSchema<typeof schemas.getVersion.response['403']>;
declare type UpdateVersionMetadataParam = FromSchema<typeof schemas.updateVersion.metadata>;
declare type ErrorVersionCantDemoteStable = FromSchema<
  typeof schemas.$ref.ErrorVersionCantDemoteStable
>;
declare type UpdateVersionResponse401 = FromSchema<typeof schemas.updateVersion.response['401']>;
declare type UpdateVersionResponse403 = FromSchema<typeof schemas.updateVersion.response['403']>;
declare type DeleteVersionMetadataParam = FromSchema<typeof schemas.deleteVersion.metadata>;
declare type ErrorVersionCantRemoveStable = FromSchema<
  typeof schemas.$ref.ErrorVersionCantRemoveStable
>;
declare type DeleteVersionResponse401 = FromSchema<typeof schemas.deleteVersion.response['401']>;
declare type DeleteVersionResponse403 = FromSchema<typeof schemas.deleteVersion.response['403']>;
