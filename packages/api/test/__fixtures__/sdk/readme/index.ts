import type { FromSchema } from 'json-schema-to-ts';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '@readme/oas-examples/3.0/json/readme.json';

class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][] = [];

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
    metadata: GetApiRegistryMetadataParam
  ): Promise<GetApiRegistryResponse200 | ErrorRegistryNotfound> {
    return this.core.fetch('/api-registry/{uuid}', 'get', metadata);
  }

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
  > {
    return this.core.fetch('/api-specification', 'get', metadata);
  }

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
  > {
    return this.core.fetch('/api-specification', 'post', body, metadata);
  }

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
  > {
    return this.core.fetch('/api-specification/{id}', 'put', body, metadata);
  }

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
  > {
    return this.core.fetch('/api-specification/{id}', 'delete', metadata);
  }

  /**
   * Returns all the roles we're hiring for at ReadMe!
   *
   * @summary Get open roles
   */
  getOpenRoles(): Promise<GetOpenRolesResponse200> {
    return this.core.fetch('/apply', 'get');
  }

  /**
   * This endpoint will let you apply to a job at ReadMe programatically, without having to go through our UI!
   *
   * @summary Submit your application!
   */
  applyToReadMe<T = unknown>(body: Apply): Promise<T> {
    return this.core.fetch('/apply', 'post', body);
  }

  /**
   * Returns all the categories for a specified version
   *
   * @summary Get all categories
   */
  getCategories(metadata?: GetCategoriesMetadataParam): Promise<GetCategoriesResponse200> {
    return this.core.fetch('/categories', 'get', metadata);
  }

  /**
   * Create a new category inside of this project
   *
   * @summary Create category
   */
  createCategory(
    body: Category,
    metadata?: CreateCategoryMetadataParam
  ): Promise<ErrorCategoryInvalid> {
    return this.core.fetch('/categories', 'post', body, metadata);
  }

  /**
   * Returns the category with this slug
   *
   * @summary Get category
   */
  getCategory(metadata: GetCategoryMetadataParam): Promise<ErrorCategoryNotfound> {
    return this.core.fetch('/categories/{slug}', 'get', metadata);
  }

  /**
   * Change the properties of a category.
   *
   * @summary Update category
   */
  updateCategory(
    body: Category,
    metadata: UpdateCategoryMetadataParam
  ): Promise<ErrorCategoryInvalid | ErrorCategoryNotfound> {
    return this.core.fetch('/categories/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the category with this slug.
   * >⚠️Heads Up!
   * > This will also delete all of the docs within this category.
   *
   * @summary Delete category
   */
  deleteCategory(metadata: DeleteCategoryMetadataParam): Promise<ErrorCategoryNotfound> {
    return this.core.fetch('/categories/{slug}', 'delete', metadata);
  }

  /**
   * Returns the docs and children docs within this category
   *
   * @summary Get docs for category
   */
  getCategoryDocs(metadata: GetCategoryDocsMetadataParam): Promise<ErrorCategoryNotfound> {
    return this.core.fetch('/categories/{slug}/docs', 'get', metadata);
  }

  /**
   * Returns a list of changelogs associated with the project API key
   *
   * @summary Get changelogs
   */
  getChangelogs(metadata?: GetChangelogsMetadataParam): Promise<GetChangelogsResponse200> {
    return this.core.fetch('/changelogs', 'get', metadata);
  }

  /**
   * Create a new changelog inside of this project
   *
   * @summary Create changelog
   */
  createChangelog<T = unknown>(body: Changelog): Promise<T> {
    return this.core.fetch('/changelogs', 'post', body);
  }

  /**
   * Returns the changelog with this slug
   *
   * @summary Get changelog
   */
  getChangelog<T = unknown>(metadata: GetChangelogMetadataParam): Promise<T> {
    return this.core.fetch('/changelogs/{slug}', 'get', metadata);
  }

  /**
   * Update a changelog with this slug
   *
   * @summary Update changelog
   */
  updateChangelog<T = unknown>(
    body: Changelog,
    metadata: UpdateChangelogMetadataParam
  ): Promise<T> {
    return this.core.fetch('/changelogs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the changelog with this slug
   *
   * @summary Delete changelog
   */
  deleteChangelog<T = unknown>(metadata: DeleteChangelogMetadataParam): Promise<T> {
    return this.core.fetch('/changelogs/{slug}', 'delete', metadata);
  }

  /**
   * Returns a list of custom pages associated with the project API key
   *
   * @summary Get custom pages
   */
  getCustomPages(
    metadata?: GetCustomPagesMetadataParam
  ): Promise<GetCustomPagesResponse200 | GetCustomPagesResponse401 | GetCustomPagesResponse403> {
    return this.core.fetch('/custompages', 'get', metadata);
  }

  /**
   * Create a new custom page inside of this project
   *
   * @summary Create custom page
   */
  createCustomPage(
    body: CustomPage
  ): Promise<ErrorCustompageInvalid | CreateCustomPageResponse401 | CreateCustomPageResponse403> {
    return this.core.fetch('/custompages', 'post', body);
  }

  /**
   * Returns the custom page with this slug
   *
   * @summary Get custom page
   */
  getCustomPage(
    metadata: GetCustomPageMetadataParam
  ): Promise<GetCustomPageResponse401 | GetCustomPageResponse403 | ErrorCustompageNotfound> {
    return this.core.fetch('/custompages/{slug}', 'get', metadata);
  }

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
  > {
    return this.core.fetch('/custompages/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the custom page with this slug
   *
   * @summary Delete custom page
   */
  deleteCustomPage(
    metadata: DeleteCustomPageMetadataParam
  ): Promise<DeleteCustomPageResponse401 | DeleteCustomPageResponse403 | ErrorCustompageNotfound> {
    return this.core.fetch('/custompages/{slug}', 'delete', metadata);
  }

  /**
   * Returns the doc with this slug
   *
   * @summary Get doc
   */
  getDoc(
    metadata: GetDocMetadataParam
  ): Promise<GetDocResponse401 | GetDocResponse403 | ErrorDocNotfound> {
    return this.core.fetch('/docs/{slug}', 'get', metadata);
  }

  /**
   * Update a doc with this slug
   *
   * @summary Update doc
   */
  updateDoc(
    body: Doc,
    metadata: UpdateDocMetadataParam
  ): Promise<ErrorDocInvalid | UpdateDocResponse401 | UpdateDocResponse403 | ErrorDocNotfound> {
    return this.core.fetch('/docs/{slug}', 'put', body, metadata);
  }

  /**
   * Delete the doc with this slug
   *
   * @summary Delete doc
   */
  deleteDoc(
    metadata: DeleteDocMetadataParam
  ): Promise<DeleteDocResponse401 | DeleteDocResponse403 | ErrorDocNotfound> {
    return this.core.fetch('/docs/{slug}', 'delete', metadata);
  }

  /**
   * Create a new doc inside of this project
   *
   * @summary Create doc
   */
  createDoc(
    body: Doc,
    metadata?: CreateDocMetadataParam
  ): Promise<ErrorDocInvalid | CreateDocResponse401 | CreateDocResponse403> {
    return this.core.fetch('/docs', 'post', body, metadata);
  }

  /**
   * Returns all docs that match the search
   *
   * @summary Search docs
   */
  searchDocs(
    metadata: SearchDocsMetadataParam
  ): Promise<SearchDocsResponse401 | SearchDocsResponse403> {
    return this.core.fetch('/docs/search', 'post', metadata);
  }

  /**
   * Returns with all of the error page types for this project
   *
   * @summary Get errors
   */
  getErrors(): Promise<GetErrorsResponse401 | GetErrorsResponse403> {
    return this.core.fetch('/errors', 'get');
  }

  /**
   * Returns project data for API key
   *
   * @summary Get metadata about the current project
   */
  getProject(): Promise<CondensedProjectData | GetProjectResponse401 | GetProjectResponse403> {
    return this.core.fetch('/', 'get');
  }

  /**
   * Retrieve a list of versions associated with a project API key
   *
   * @summary Get versions
   */
  getVersions(): Promise<GetVersionsResponse401 | GetVersionsResponse403> {
    return this.core.fetch('/version', 'get');
  }

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
  > {
    return this.core.fetch('/version', 'post', body);
  }

  /**
   * Returns the version with this version ID
   *
   * @summary Get version
   */
  getVersion(
    metadata: GetVersionMetadataParam
  ): Promise<GetVersionResponse401 | GetVersionResponse403 | ErrorVersionNotfound> {
    return this.core.fetch('/version/{versionId}', 'get', metadata);
  }

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
  > {
    return this.core.fetch('/version/{versionId}', 'put', body, metadata);
  }

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
  > {
    return this.core.fetch('/version/{versionId}', 'delete', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}

const schemas = {
  getAPIRegistry: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            uuid: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'An API Registry UUID. This can be found by navigating to your API Reference page and viewing code snippets for Node with the `api` library.',
            },
          },
          required: ['uuid'],
        },
      ],
    },
    response: {
      '200': {
        type: 'object',
        additionalProperties: true,
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  $ref: {
    ErrorRegistryNotfound: {
      title: 'error_REGISTRY_NOTFOUND',
      'x-readme-ref-name': 'error_REGISTRY_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'REGISTRY_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorVersionEmpty: {
      title: 'error_VERSION_EMPTY',
      'x-readme-ref-name': 'error_VERSION_EMPTY',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'VERSION_EMPTY',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorVersionNotfound: {
      title: 'error_VERSION_NOTFOUND',
      'x-readme-ref-name': 'error_VERSION_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'VERSION_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorSpecTimeout: {
      title: 'error_SPEC_TIMEOUT',
      'x-readme-ref-name': 'error_SPEC_TIMEOUT',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'SPEC_TIMEOUT',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorSpecIdInvalid: {
      title: 'error_SPEC_ID_INVALID',
      'x-readme-ref-name': 'error_SPEC_ID_INVALID',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'SPEC_ID_INVALID',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorSpecNotfound: {
      title: 'error_SPEC_NOTFOUND',
      'x-readme-ref-name': 'error_SPEC_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'SPEC_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    Apply: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, description: 'Your full name', default: 'Your Name' },
        email: {
          type: 'string',
          format: 'email',
          description: 'A valid email we can reach you at',
          default: 'you@example.com',
        },
        job: {
          type: 'string',
          description: "The job you're looking to apply for (https://readme.com/careers)",
          enum: [
            'Content Marketing Manager',
            'Engineering Manager',
            'Head of People',
            'Marketing Campaigns Manager',
            'Marketing Designer',
            'Product Designer',
            'Product Education Manager',
            'Sales Development Representative',
            'Support Engineer (Weekends)',
          ],
          default: 'Content Marketing Manager',
        },
        pronouns: { type: 'string', description: 'Learn more at https://pronoun.is/' },
        linkedin: {
          type: 'string',
          format: 'url',
          description: 'What have you been up to the past few years?',
        },
        github: {
          type: 'string',
          description: 'Or Bitbucket, Gitlab or anywhere else your code is hosted!',
          format: 'url',
        },
        coverLetter: {
          type: 'string',
          format: 'blob',
          description: 'What should we know about you?',
        },
        dontReallyApply: {
          type: 'boolean',
          description: 'Want to play with the API but not actually apply? Set this to true.',
          default: false,
        },
      },
      required: ['name', 'email', 'job'],
      title: 'apply',
      'x-readme-ref-name': 'apply',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    Category: {
      type: 'object',
      title: 'category',
      'x-readme-ref-name': 'category',
      required: ['title'],
      properties: {
        title: {
          type: 'string',
          description: 'A short title for the category. This is what will show in the sidebar.',
        },
        type: {
          type: 'string',
          enum: ['reference', 'guide'],
          default: 'guide',
          description:
            'A category can be part of your reference or guide documentation, which is determined by this field.',
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorCategoryInvalid: {
      title: 'error_CATEGORY_INVALID',
      'x-readme-ref-name': 'error_CATEGORY_INVALID',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'CATEGORY_INVALID',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorCategoryNotfound: {
      title: 'error_CATEGORY_NOTFOUND',
      'x-readme-ref-name': 'error_CATEGORY_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'CATEGORY_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    Changelog: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the changelog' },
        type: { type: 'string', enum: ['', 'added', 'fixed', 'improved', 'deprecated', 'removed'] },
        body: { type: 'string', description: 'Body content of the changelog' },
        hidden: { type: 'boolean', description: 'Visibility of the changelog', default: true },
      },
      required: ['title', 'body'],
      title: 'changelog',
      'x-readme-ref-name': 'changelog',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    CustomPage: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the custom page' },
        body: { description: 'Body formatted in Markdown (displayed by default).', type: 'string' },
        html: {
          description:
            'Body formatted in HTML (sanitized, only displayed if `htmlmode` is **true**).',
          type: 'string',
        },
        htmlmode: {
          description:
            '**true** if `html` should be displayed, **false** if `body` should be displayed.',
          type: 'boolean',
          default: false,
        },
        hidden: { type: 'boolean', description: 'Visibility of the custom page', default: true },
      },
      required: ['title'],
      title: 'customPage',
      'x-readme-ref-name': 'customPage',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorCustompageInvalid: {
      title: 'error_CUSTOMPAGE_INVALID',
      'x-readme-ref-name': 'error_CUSTOMPAGE_INVALID',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'CUSTOMPAGE_INVALID',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorCustompageNotfound: {
      title: 'error_CUSTOMPAGE_NOTFOUND',
      'x-readme-ref-name': 'error_CUSTOMPAGE_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'CUSTOMPAGE_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorDocNotfound: {
      title: 'error_DOC_NOTFOUND',
      'x-readme-ref-name': 'error_DOC_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'DOC_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    Doc: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the page' },
        type: {
          type: 'string',
          description:
            'Type of the page. The available types all show up under the /docs/ URL path of your docs project (also known as the "guides" section). Can be "basic" (most common), "error" (page desribing an API error), or "link" (page that redirects to an external link)',
          enum: ['basic', 'error', 'link'],
        },
        body: {
          type: 'string',
          description:
            'Body content of the page, formatted in ReadMe or GitHub flavored Markdown. Accepts long page content, for example, greater than 100k characters',
        },
        category: {
          type: 'string',
          description:
            'Category ID of the page, which you can get through https://docs.readme.com/reference/categories#getcategory ',
        },
        hidden: { type: 'boolean', description: 'Visibility of the page', default: true },
        order: {
          type: 'integer',
          description: 'The position of the page in your project sidebar.',
          default: 999,
        },
        parentDoc: {
          type: 'string',
          description:
            'For a subpage, specify the parent doc ID, which you can get through https://docs.readme.com/reference/docs#getdoc',
        },
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', description: 'The error code for docs with the "error" type' },
          },
        },
      },
      required: ['title', 'category'],
      title: 'doc',
      'x-readme-ref-name': 'doc',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorDocInvalid: {
      title: 'error_DOC_INVALID',
      'x-readme-ref-name': 'error_DOC_INVALID',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'DOC_INVALID',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    CondensedProjectData: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        subdomain: { type: 'string' },
        jwtSecret: { type: 'string' },
        baseUrl: {
          type: 'string',
          format: 'url',
          description:
            'The base URL for the project. If the project is not running under a custom domain, it will be `https://projectSubdomain.readme.io`, otherwise it can either be or `https://example.com` or, in the case of an enterprise child project `https://example.com/projectSubdomain`.',
        },
        plan: { type: 'string' },
      },
      title: 'condensedProjectData',
      'x-readme-ref-name': 'condensedProjectData',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    Version: {
      type: 'object',
      properties: {
        version: { type: 'string', description: 'Semantic Version' },
        codename: { type: 'string', description: 'Dubbed name of version' },
        from: { type: 'string', description: 'Semantic Version to use as the base fork' },
        is_stable: { type: 'boolean', description: 'Should this be the **main** version' },
        is_beta: { type: 'boolean', default: true },
        is_hidden: { type: 'boolean', description: 'Should this be publically accessible?' },
        is_deprecated: {
          type: 'boolean',
          description: 'Should this be deprecated? Only allowed in PUT operations',
        },
      },
      required: ['version', 'from'],
      title: 'version',
      'x-readme-ref-name': 'version',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorVersionForkNotfound: {
      title: 'error_VERSION_FORK_NOTFOUND',
      'x-readme-ref-name': 'error_VERSION_FORK_NOTFOUND',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'VERSION_FORK_NOTFOUND',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorVersionCantDemoteStable: {
      title: 'error_VERSION_CANT_DEMOTE_STABLE',
      'x-readme-ref-name': 'error_VERSION_CANT_DEMOTE_STABLE',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'VERSION_CANT_DEMOTE_STABLE',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ErrorVersionCantRemoveStable: {
      title: 'error_VERSION_CANT_REMOVE_STABLE',
      'x-readme-ref-name': 'error_VERSION_CANT_REMOVE_STABLE',
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'An error code unique to the error received.',
          default: 'VERSION_CANT_REMOVE_STABLE',
        },
        message: { type: 'string', description: 'The reason why the error occured.' },
        suggestion: {
          type: 'string',
          description: 'A helpful suggestion for how to alleviate the error.',
        },
        docs: {
          type: 'string',
          format: 'url',
          description:
            'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
          examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
        },
        help: {
          type: 'string',
          description:
            'Information on where you can receive additional assistance from our wonderful support team.',
          examples: ['If you need help, email support@readme.io'],
        },
        poem: {
          type: 'array',
          description: 'A short poem we wrote you about your error.',
          items: { type: 'string' },
          examples: [
            "If you're seeing this error,",
            "Things didn't quite go the way we hoped.",
            'When we tried to process your request,',
            "Maybe trying again it'll work—who knows!",
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
  getAPISpecification: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            perPage: {
              type: 'integer',
              default: 10,
              minimum: 1,
              maximum: 100,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Number of items to include in pagination (up to 100, defaults to 10)',
            },
            page: {
              type: 'integer',
              default: 1,
              minimum: 1,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Used to specify further pages (starts at 1)',
            },
          },
          required: [],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          Link: {
            type: 'string',
            description:
              'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
          },
          'x-total-count': {
            type: 'string',
            description:
              'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
          },
        },
      },
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  uploadAPISpecification: {
    body: {
      type: 'object',
      properties: {
        spec: { description: 'OpenAPI/Swagger file', type: 'string', format: 'binary' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '400': {
        oneOf: [
          {
            title: 'error_SPEC_FILE_EMPTY',
            'x-readme-ref-name': 'error_SPEC_FILE_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_FILE_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_INVALID',
            'x-readme-ref-name': 'error_SPEC_INVALID',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_INVALID',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_INVALID_SCHEMA',
            'x-readme-ref-name': 'error_SPEC_INVALID_SCHEMA',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_INVALID_SCHEMA',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_VERSION_NOTFOUND',
            'x-readme-ref-name': 'error_SPEC_VERSION_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_VERSION_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  updateAPISpecification: {
    body: {
      type: 'object',
      properties: {
        spec: { description: 'OpenAPI/Swagger file', type: 'string', format: 'binary' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.',
            },
          },
          required: ['id'],
        },
      ],
    },
    response: {
      '400': {
        oneOf: [
          {
            title: 'error_SPEC_FILE_EMPTY',
            'x-readme-ref-name': 'error_SPEC_FILE_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_FILE_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_ID_DUPLICATE',
            'x-readme-ref-name': 'error_SPEC_ID_DUPLICATE',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_ID_DUPLICATE',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_ID_INVALID',
            'x-readme-ref-name': 'error_SPEC_ID_INVALID',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_ID_INVALID',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_INVALID',
            'x-readme-ref-name': 'error_SPEC_INVALID',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_INVALID',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_INVALID_SCHEMA',
            'x-readme-ref-name': 'error_SPEC_INVALID_SCHEMA',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_INVALID_SCHEMA',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_SPEC_VERSION_NOTFOUND',
            'x-readme-ref-name': 'error_SPEC_VERSION_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'SPEC_VERSION_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  deleteAPISpecification: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.',
            },
          },
          required: ['id'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getOpenRoles: {
    response: {
      '200': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'A slugified version of the job opening title.',
              examples: ['api-engineer'],
            },
            title: {
              type: 'string',
              description: 'The job opening position.',
              examples: ['API Engineer'],
            },
            description: {
              type: 'string',
              description:
                'The description for this open position. This content is formatted as HTML.',
            },
            pullquote: {
              type: 'string',
              description: 'A short pullquote for the open position.',
              examples: ['Deeply knowledgeable of the web, HTTP, and the API space.'],
            },
            location: {
              type: 'string',
              description: 'Where this position is located at.',
              examples: ['Remote'],
            },
            department: {
              type: 'string',
              description: "The internal organization you'll be working in.",
              examples: ['Engineering'],
            },
            url: {
              type: 'string',
              format: 'url',
              description: 'The place where you can apply for the position!',
            },
          },
          title: 'jobOpening',
          'x-readme-ref-name': 'jobOpening',
        },
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getCategories: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            perPage: {
              type: 'integer',
              default: 10,
              minimum: 1,
              maximum: 100,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Number of items to include in pagination (up to 100, defaults to 10)',
            },
            page: {
              type: 'integer',
              default: 1,
              minimum: 1,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Used to specify further pages (starts at 1)',
            },
          },
          required: [],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          Link: {
            type: 'string',
            description:
              'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
          },
          'x-total-count': {
            type: 'string',
            description:
              'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
          },
        },
      },
    },
  },
  createCategory: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
  },
  getCategory: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['getting-started'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
  },
  updateCategory: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['getting-started'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
  },
  deleteCategory: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['getting-started'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
  },
  getCategoryDocs: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['getting-started'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
  },
  getChangelogs: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            perPage: {
              type: 'integer',
              default: 10,
              minimum: 1,
              maximum: 100,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Number of items to include in pagination (up to 100, defaults to 10)',
            },
            page: {
              type: 'integer',
              default: 1,
              minimum: 1,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Used to specify further pages (starts at 1)',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          Link: {
            type: 'string',
            description:
              'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
          },
          'x-total-count': {
            type: 'string',
            description:
              'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
          },
        },
      },
    },
  },
  getChangelog: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"',
            },
          },
          required: ['slug'],
        },
      ],
    },
  },
  updateChangelog: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"',
            },
          },
          required: ['slug'],
        },
      ],
    },
  },
  deleteChangelog: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update"',
            },
          },
          required: ['slug'],
        },
      ],
    },
  },
  getCustomPages: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            perPage: {
              type: 'integer',
              default: 10,
              minimum: 1,
              maximum: 100,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Number of items to include in pagination (up to 100, defaults to 10)',
            },
            page: {
              type: 'integer',
              default: 1,
              minimum: 1,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Used to specify further pages (starts at 1)',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '200': {
        type: 'object',
        properties: {
          Link: {
            type: 'string',
            description:
              'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
          },
          'x-total-count': {
            type: 'string',
            description:
              'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
          },
        },
      },
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  createCustomPage: {
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getCustomPage: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  updateCustomPage: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  deleteCustomPage: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started"',
            },
          },
          required: ['slug'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getDoc: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['new-features'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  updateDoc: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['new-features'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  deleteDoc: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              examples: ['new-features'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features"',
            },
          },
          required: ['slug'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  createDoc: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  searchDocs: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            search: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Search string to look for',
            },
          },
          required: ['search'],
        },
        {
          type: 'object',
          properties: {
            'x-readme-version': {
              type: 'string',
              examples: ['v3.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
            },
          },
          required: [],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getErrors: {
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getProject: {
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getVersions: {
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  createVersion: {
    response: {
      '400': {
        oneOf: [
          {
            title: 'error_VERSION_EMPTY',
            'x-readme-ref-name': 'error_VERSION_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'VERSION_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_VERSION_DUPLICATE',
            'x-readme-ref-name': 'error_VERSION_DUPLICATE',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'VERSION_DUPLICATE',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_VERSION_FORK_EMPTY',
            'x-readme-ref-name': 'error_VERSION_FORK_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'VERSION_FORK_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getVersion: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            versionId: {
              type: 'string',
              examples: ['v1.0.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).',
            },
          },
          required: ['versionId'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  updateVersion: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            versionId: {
              type: 'string',
              examples: ['v1.0.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).',
            },
          },
          required: ['versionId'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  deleteVersion: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            versionId: {
              type: 'string',
              examples: ['v1.0.0'],
              $schema: 'http://json-schema.org/draft-04/schema#',
              description:
                'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).',
            },
          },
          required: ['versionId'],
        },
      ],
    },
    response: {
      '401': {
        oneOf: [
          {
            title: 'error_APIKEY_EMPTY',
            'x-readme-ref-name': 'error_APIKEY_EMPTY',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_EMPTY',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
          {
            title: 'error_APIKEY_NOTFOUND',
            'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_NOTFOUND',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
      '403': {
        oneOf: [
          {
            title: 'error_APIKEY_MISMATCH',
            'x-readme-ref-name': 'error_APIKEY_MISMATCH',
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'An error code unique to the error received.',
                default: 'APIKEY_MISMATCH',
              },
              message: { type: 'string', description: 'The reason why the error occured.' },
              suggestion: {
                type: 'string',
                description: 'A helpful suggestion for how to alleviate the error.',
              },
              docs: {
                type: 'string',
                format: 'url',
                description:
                  'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
                examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
              },
              help: {
                type: 'string',
                description:
                  'Information on where you can receive additional assistance from our wonderful support team.',
                examples: ['If you need help, email support@readme.io'],
              },
              poem: {
                type: 'array',
                description: 'A short poem we wrote you about your error.',
                items: { type: 'string' },
                examples: [
                  "If you're seeing this error,",
                  "Things didn't quite go the way we hoped.",
                  'When we tried to process your request,',
                  "Maybe trying again it'll work—who knows!",
                ],
              },
            },
          },
        ],
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
} as const;
type GetApiRegistryMetadataParam = FromSchema<typeof schemas.getAPIRegistry.metadata>;
type GetApiRegistryResponse200 = FromSchema<typeof schemas.getAPIRegistry.response['200']>;
type ErrorRegistryNotfound = FromSchema<typeof schemas.$ref.ErrorRegistryNotfound>;
type GetApiSpecificationMetadataParam = FromSchema<typeof schemas.getAPISpecification.metadata>;
type GetApiSpecificationResponse200 = FromSchema<
  typeof schemas.getAPISpecification.response['200']
>;
type ErrorVersionEmpty = FromSchema<typeof schemas.$ref.ErrorVersionEmpty>;
type GetApiSpecificationResponse401 = FromSchema<
  typeof schemas.getAPISpecification.response['401']
>;
type GetApiSpecificationResponse403 = FromSchema<
  typeof schemas.getAPISpecification.response['403']
>;
type ErrorVersionNotfound = FromSchema<typeof schemas.$ref.ErrorVersionNotfound>;
type UploadApiSpecificationBodyParam = FromSchema<typeof schemas.uploadAPISpecification.body>;
type UploadApiSpecificationMetadataParam = FromSchema<
  typeof schemas.uploadAPISpecification.metadata
>;
type UploadApiSpecificationResponse400 = FromSchema<
  typeof schemas.uploadAPISpecification.response['400']
>;
type UploadApiSpecificationResponse401 = FromSchema<
  typeof schemas.uploadAPISpecification.response['401']
>;
type UploadApiSpecificationResponse403 = FromSchema<
  typeof schemas.uploadAPISpecification.response['403']
>;
type ErrorSpecTimeout = FromSchema<typeof schemas.$ref.ErrorSpecTimeout>;
type UpdateApiSpecificationBodyParam = FromSchema<typeof schemas.updateAPISpecification.body>;
type UpdateApiSpecificationMetadataParam = FromSchema<
  typeof schemas.updateAPISpecification.metadata
>;
type UpdateApiSpecificationResponse400 = FromSchema<
  typeof schemas.updateAPISpecification.response['400']
>;
type UpdateApiSpecificationResponse401 = FromSchema<
  typeof schemas.updateAPISpecification.response['401']
>;
type UpdateApiSpecificationResponse403 = FromSchema<
  typeof schemas.updateAPISpecification.response['403']
>;
type DeleteApiSpecificationMetadataParam = FromSchema<
  typeof schemas.deleteAPISpecification.metadata
>;
type ErrorSpecIdInvalid = FromSchema<typeof schemas.$ref.ErrorSpecIdInvalid>;
type DeleteApiSpecificationResponse401 = FromSchema<
  typeof schemas.deleteAPISpecification.response['401']
>;
type DeleteApiSpecificationResponse403 = FromSchema<
  typeof schemas.deleteAPISpecification.response['403']
>;
type ErrorSpecNotfound = FromSchema<typeof schemas.$ref.ErrorSpecNotfound>;
type GetOpenRolesResponse200 = FromSchema<typeof schemas.getOpenRoles.response['200']>;
type Apply = FromSchema<typeof schemas.$ref.Apply>;
type GetCategoriesMetadataParam = FromSchema<typeof schemas.getCategories.metadata>;
type GetCategoriesResponse200 = FromSchema<typeof schemas.getCategories.response['200']>;
type Category = FromSchema<typeof schemas.$ref.Category>;
type CreateCategoryMetadataParam = FromSchema<typeof schemas.createCategory.metadata>;
type ErrorCategoryInvalid = FromSchema<typeof schemas.$ref.ErrorCategoryInvalid>;
type GetCategoryMetadataParam = FromSchema<typeof schemas.getCategory.metadata>;
type ErrorCategoryNotfound = FromSchema<typeof schemas.$ref.ErrorCategoryNotfound>;
type UpdateCategoryMetadataParam = FromSchema<typeof schemas.updateCategory.metadata>;
type DeleteCategoryMetadataParam = FromSchema<typeof schemas.deleteCategory.metadata>;
type GetCategoryDocsMetadataParam = FromSchema<typeof schemas.getCategoryDocs.metadata>;
type GetChangelogsMetadataParam = FromSchema<typeof schemas.getChangelogs.metadata>;
type GetChangelogsResponse200 = FromSchema<typeof schemas.getChangelogs.response['200']>;
type Changelog = FromSchema<typeof schemas.$ref.Changelog>;
type GetChangelogMetadataParam = FromSchema<typeof schemas.getChangelog.metadata>;
type UpdateChangelogMetadataParam = FromSchema<typeof schemas.updateChangelog.metadata>;
type DeleteChangelogMetadataParam = FromSchema<typeof schemas.deleteChangelog.metadata>;
type GetCustomPagesMetadataParam = FromSchema<typeof schemas.getCustomPages.metadata>;
type GetCustomPagesResponse200 = FromSchema<typeof schemas.getCustomPages.response['200']>;
type GetCustomPagesResponse401 = FromSchema<typeof schemas.getCustomPages.response['401']>;
type GetCustomPagesResponse403 = FromSchema<typeof schemas.getCustomPages.response['403']>;
type CustomPage = FromSchema<typeof schemas.$ref.CustomPage>;
type ErrorCustompageInvalid = FromSchema<typeof schemas.$ref.ErrorCustompageInvalid>;
type CreateCustomPageResponse401 = FromSchema<typeof schemas.createCustomPage.response['401']>;
type CreateCustomPageResponse403 = FromSchema<typeof schemas.createCustomPage.response['403']>;
type GetCustomPageMetadataParam = FromSchema<typeof schemas.getCustomPage.metadata>;
type GetCustomPageResponse401 = FromSchema<typeof schemas.getCustomPage.response['401']>;
type GetCustomPageResponse403 = FromSchema<typeof schemas.getCustomPage.response['403']>;
type ErrorCustompageNotfound = FromSchema<typeof schemas.$ref.ErrorCustompageNotfound>;
type UpdateCustomPageMetadataParam = FromSchema<typeof schemas.updateCustomPage.metadata>;
type UpdateCustomPageResponse401 = FromSchema<typeof schemas.updateCustomPage.response['401']>;
type UpdateCustomPageResponse403 = FromSchema<typeof schemas.updateCustomPage.response['403']>;
type DeleteCustomPageMetadataParam = FromSchema<typeof schemas.deleteCustomPage.metadata>;
type DeleteCustomPageResponse401 = FromSchema<typeof schemas.deleteCustomPage.response['401']>;
type DeleteCustomPageResponse403 = FromSchema<typeof schemas.deleteCustomPage.response['403']>;
type GetDocMetadataParam = FromSchema<typeof schemas.getDoc.metadata>;
type GetDocResponse401 = FromSchema<typeof schemas.getDoc.response['401']>;
type GetDocResponse403 = FromSchema<typeof schemas.getDoc.response['403']>;
type ErrorDocNotfound = FromSchema<typeof schemas.$ref.ErrorDocNotfound>;
type Doc = FromSchema<typeof schemas.$ref.Doc>;
type UpdateDocMetadataParam = FromSchema<typeof schemas.updateDoc.metadata>;
type ErrorDocInvalid = FromSchema<typeof schemas.$ref.ErrorDocInvalid>;
type UpdateDocResponse401 = FromSchema<typeof schemas.updateDoc.response['401']>;
type UpdateDocResponse403 = FromSchema<typeof schemas.updateDoc.response['403']>;
type DeleteDocMetadataParam = FromSchema<typeof schemas.deleteDoc.metadata>;
type DeleteDocResponse401 = FromSchema<typeof schemas.deleteDoc.response['401']>;
type DeleteDocResponse403 = FromSchema<typeof schemas.deleteDoc.response['403']>;
type CreateDocMetadataParam = FromSchema<typeof schemas.createDoc.metadata>;
type CreateDocResponse401 = FromSchema<typeof schemas.createDoc.response['401']>;
type CreateDocResponse403 = FromSchema<typeof schemas.createDoc.response['403']>;
type SearchDocsMetadataParam = FromSchema<typeof schemas.searchDocs.metadata>;
type SearchDocsResponse401 = FromSchema<typeof schemas.searchDocs.response['401']>;
type SearchDocsResponse403 = FromSchema<typeof schemas.searchDocs.response['403']>;
type GetErrorsResponse401 = FromSchema<typeof schemas.getErrors.response['401']>;
type GetErrorsResponse403 = FromSchema<typeof schemas.getErrors.response['403']>;
type CondensedProjectData = FromSchema<typeof schemas.$ref.CondensedProjectData>;
type GetProjectResponse401 = FromSchema<typeof schemas.getProject.response['401']>;
type GetProjectResponse403 = FromSchema<typeof schemas.getProject.response['403']>;
type GetVersionsResponse401 = FromSchema<typeof schemas.getVersions.response['401']>;
type GetVersionsResponse403 = FromSchema<typeof schemas.getVersions.response['403']>;
type Version = FromSchema<typeof schemas.$ref.Version>;
type CreateVersionResponse400 = FromSchema<typeof schemas.createVersion.response['400']>;
type CreateVersionResponse401 = FromSchema<typeof schemas.createVersion.response['401']>;
type CreateVersionResponse403 = FromSchema<typeof schemas.createVersion.response['403']>;
type ErrorVersionForkNotfound = FromSchema<typeof schemas.$ref.ErrorVersionForkNotfound>;
type GetVersionMetadataParam = FromSchema<typeof schemas.getVersion.metadata>;
type GetVersionResponse401 = FromSchema<typeof schemas.getVersion.response['401']>;
type GetVersionResponse403 = FromSchema<typeof schemas.getVersion.response['403']>;
type UpdateVersionMetadataParam = FromSchema<typeof schemas.updateVersion.metadata>;
type ErrorVersionCantDemoteStable = FromSchema<typeof schemas.$ref.ErrorVersionCantDemoteStable>;
type UpdateVersionResponse401 = FromSchema<typeof schemas.updateVersion.response['401']>;
type UpdateVersionResponse403 = FromSchema<typeof schemas.updateVersion.response['403']>;
type DeleteVersionMetadataParam = FromSchema<typeof schemas.deleteVersion.metadata>;
type ErrorVersionCantRemoveStable = FromSchema<typeof schemas.$ref.ErrorVersionCantRemoveStable>;
type DeleteVersionResponse401 = FromSchema<typeof schemas.deleteVersion.response['401']>;
type DeleteVersionResponse403 = FromSchema<typeof schemas.deleteVersion.response['403']>;
