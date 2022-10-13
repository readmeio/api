import type { FromSchema } from 'json-schema-to-ts';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '@readme/oas-examples/3.0/json/petstore.json';

class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][] = [];

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'petstore/1.0.0 (api/5.0-unit-testing)');
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
   * Add a new pet to the store
   *
   */
  post<T = unknown>(path: '/pet', body: Pet): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  post<T = unknown>(
    path: '/pet/{petId}',
    body: UpdatePetWithFormFormDataParam,
    metadata: UpdatePetWithFormMetadataParam
  ): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  post<T = unknown>(path: '/pet/{petId}', metadata: UpdatePetWithFormMetadataParam): Promise<T>;
  /**
   * Uploads an image
   *
   */
  post(
    path: '/pet/{petId}/uploadImage',
    body: UploadFileBodyParam,
    metadata: UploadFileMetadataParam
  ): Promise<ApiResponse>;
  /**
   * Uploads an image
   *
   */
  post(path: '/pet/{petId}/uploadImage', metadata: UploadFileMetadataParam): Promise<ApiResponse>;
  /**
   * Place an order for a pet
   *
   */
  post(path: '/store/order', body: Order): Promise<Order>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Create user
   */
  post<T = unknown>(path: '/user', body: User): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  post<T = unknown>(
    path: '/user/createWithArray',
    body: CreateUsersWithArrayInputBodyParam
  ): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  post<T = unknown>(
    path: '/user/createWithList',
    body: CreateUsersWithListInputBodyParam
  ): Promise<T>;
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
   * Update an existing pet
   *
   */
  put<T = unknown>(path: '/pet', body: Pet): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Updated user
   */
  put<T = unknown>(
    path: '/user/{username}',
    body: User,
    metadata: UpdateUserMetadataParam
  ): Promise<T>;
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
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  get(
    path: '/pet/findByStatus',
    metadata: FindPetsByStatusMetadataParam
  ): Promise<FindPetsByStatusResponse200>;
  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  get(
    path: '/pet/findByTags',
    metadata: FindPetsByTagsMetadataParam
  ): Promise<FindPetsByTagsResponse200>;
  /**
   * Returns a single pet
   *
   * @summary Find pet by ID
   */
  get(path: '/pet/{petId}', metadata: GetPetByIdMetadataParam): Promise<Pet>;
  /**
   * Returns a map of status codes to quantities
   *
   * @summary Returns pet inventories by status
   */
  get(path: '/store/inventory'): Promise<GetInventoryResponse200>;
  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
   *
   * @summary Find purchase order by ID
   */
  get(path: '/store/order/{orderId}', metadata: GetOrderByIdMetadataParam): Promise<Order>;
  /**
   * Logs user into the system
   *
   */
  get(path: '/user/login', metadata: LoginUserMetadataParam): Promise<LoginUserResponse200>;
  /**
   * Logs out current logged in user session
   *
   */
  get<T = unknown>(path: '/user/logout'): Promise<T>;
  /**
   * Get user by user name
   *
   */
  get(path: '/user/{username}', metadata: GetUserByNameMetadataParam): Promise<User>;
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
   * Deletes a pet
   *
   */
  delete<T = unknown>(path: '/pet/{petId}', metadata: DeletePetMetadataParam): Promise<T>;
  /**
   * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
   *
   * @summary Delete purchase order by ID
   */
  delete<T = unknown>(
    path: '/store/order/{orderId}',
    metadata: DeleteOrderMetadataParam
  ): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Delete user
   */
  delete<T = unknown>(path: '/user/{username}', metadata: DeleteUserMetadataParam): Promise<T>;
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
   * Add a new pet to the store
   *
   */
  addPet<T = unknown>(body: Pet): Promise<T> {
    return this.core.fetch('/pet', 'post', body);
  }

  /**
   * Update an existing pet
   *
   */
  updatePet<T = unknown>(body: Pet): Promise<T> {
    return this.core.fetch('/pet', 'put', body);
  }

  /**
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  findPetsByStatus(metadata: FindPetsByStatusMetadataParam): Promise<FindPetsByStatusResponse200> {
    return this.core.fetch('/pet/findByStatus', 'get', metadata);
  }

  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  findPetsByTags(metadata: FindPetsByTagsMetadataParam): Promise<FindPetsByTagsResponse200> {
    return this.core.fetch('/pet/findByTags', 'get', metadata);
  }

  /**
   * Returns a single pet
   *
   * @summary Find pet by ID
   */
  getPetById(metadata: GetPetByIdMetadataParam): Promise<Pet> {
    return this.core.fetch('/pet/{petId}', 'get', metadata);
  }

  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm<T = unknown>(
    body: UpdatePetWithFormFormDataParam,
    metadata: UpdatePetWithFormMetadataParam
  ): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm<T = unknown>(metadata: UpdatePetWithFormMetadataParam): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm<T = unknown>(
    body?: UpdatePetWithFormFormDataParam,
    metadata?: UpdatePetWithFormMetadataParam
  ): Promise<T> {
    return this.core.fetch('/pet/{petId}', 'post', body, metadata);
  }

  /**
   * Deletes a pet
   *
   */
  deletePet<T = unknown>(metadata: DeletePetMetadataParam): Promise<T> {
    return this.core.fetch('/pet/{petId}', 'delete', metadata);
  }

  /**
   * Uploads an image
   *
   */
  uploadFile(body: UploadFileBodyParam, metadata: UploadFileMetadataParam): Promise<ApiResponse>;
  /**
   * Uploads an image
   *
   */
  uploadFile(metadata: UploadFileMetadataParam): Promise<ApiResponse>;
  /**
   * Uploads an image
   *
   */
  uploadFile(body?: UploadFileBodyParam, metadata?: UploadFileMetadataParam): Promise<ApiResponse> {
    return this.core.fetch('/pet/{petId}/uploadImage', 'post', body, metadata);
  }

  /**
   * Returns a map of status codes to quantities
   *
   * @summary Returns pet inventories by status
   */
  getInventory(): Promise<GetInventoryResponse200> {
    return this.core.fetch('/store/inventory', 'get');
  }

  /**
   * Place an order for a pet
   *
   */
  placeOrder(body: Order): Promise<Order> {
    return this.core.fetch('/store/order', 'post', body);
  }

  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
   *
   * @summary Find purchase order by ID
   */
  getOrderById(metadata: GetOrderByIdMetadataParam): Promise<Order> {
    return this.core.fetch('/store/order/{orderId}', 'get', metadata);
  }

  /**
   * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
   *
   * @summary Delete purchase order by ID
   */
  deleteOrder<T = unknown>(metadata: DeleteOrderMetadataParam): Promise<T> {
    return this.core.fetch('/store/order/{orderId}', 'delete', metadata);
  }

  /**
   * This can only be done by the logged in user.
   *
   * @summary Create user
   */
  createUser<T = unknown>(body: User): Promise<T> {
    return this.core.fetch('/user', 'post', body);
  }

  /**
   * Creates list of users with given input array
   *
   */
  createUsersWithArrayInput<T = unknown>(body: CreateUsersWithArrayInputBodyParam): Promise<T> {
    return this.core.fetch('/user/createWithArray', 'post', body);
  }

  /**
   * Creates list of users with given input array
   *
   */
  createUsersWithListInput<T = unknown>(body: CreateUsersWithListInputBodyParam): Promise<T> {
    return this.core.fetch('/user/createWithList', 'post', body);
  }

  /**
   * Logs user into the system
   *
   */
  loginUser(metadata: LoginUserMetadataParam): Promise<LoginUserResponse200> {
    return this.core.fetch('/user/login', 'get', metadata);
  }

  /**
   * Logs out current logged in user session
   *
   */
  logoutUser<T = unknown>(): Promise<T> {
    return this.core.fetch('/user/logout', 'get');
  }

  /**
   * Get user by user name
   *
   */
  getUserByName(metadata: GetUserByNameMetadataParam): Promise<User> {
    return this.core.fetch('/user/{username}', 'get', metadata);
  }

  /**
   * This can only be done by the logged in user.
   *
   * @summary Updated user
   */
  updateUser<T = unknown>(body: User, metadata: UpdateUserMetadataParam): Promise<T> {
    return this.core.fetch('/user/{username}', 'put', body, metadata);
  }

  /**
   * This can only be done by the logged in user.
   *
   * @summary Delete user
   */
  deleteUser<T = unknown>(metadata: DeleteUserMetadataParam): Promise<T> {
    return this.core.fetch('/user/{username}', 'delete', metadata);
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
  $ref: {
    Pet: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          readOnly: true,
          default: 40,
          examples: [25],
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            name: { type: 'string' },
          },
          title: 'Category',
          'x-readme-ref-name': 'Category',
        },
        name: { type: 'string', examples: ['doggie'] },
        photoUrls: {
          type: 'array',
          items: { type: 'string', examples: ['https://example.com/photo.png'] },
        },
        tags: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64',
                minimum: -9223372036854776000,
                maximum: 9223372036854776000,
              },
              name: { type: 'string' },
            },
            title: 'Tag',
            'x-readme-ref-name': 'Tag',
          },
        },
        status: {
          type: 'string',
          description: 'pet status in the store',
          enum: ['available', 'pending', 'sold'],
        },
      },
      title: 'Pet',
      'x-readme-ref-name': 'Pet',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    ApiResponse: {
      type: 'object',
      properties: {
        code: { type: 'integer', format: 'int32', minimum: -2147483648, maximum: 2147483647 },
        type: { type: 'string' },
        message: { type: 'string' },
      },
      title: 'ApiResponse',
      'x-readme-ref-name': 'ApiResponse',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    Order: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        petId: {
          type: 'integer',
          format: 'int64',
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        quantity: { type: 'integer', format: 'int32', minimum: -2147483648, maximum: 2147483647 },
        shipDate: { type: 'string', format: 'date-time' },
        status: {
          type: 'string',
          description: 'Order Status',
          enum: ['placed', 'approved', 'delivered'],
        },
        complete: { type: 'boolean', default: false },
      },
      title: 'Order',
      'x-readme-ref-name': 'Order',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        username: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        phone: { type: 'string' },
        userStatus: {
          type: 'integer',
          format: 'int32',
          description: 'User Status',
          minimum: -2147483648,
          maximum: 2147483647,
        },
      },
      title: 'User',
      'x-readme-ref-name': 'User',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
  findPetsByStatus: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            status: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['available', 'pending', 'sold'],
                default: 'available',
              },
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Status values that need to be considered for filter',
            },
          },
          required: ['status'],
        },
      ],
    },
    response: {
      '200': {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'photoUrls'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              readOnly: true,
              default: 40,
              examples: [25],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            category: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  format: 'int64',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: 'string' },
              },
              title: 'Category',
              'x-readme-ref-name': 'Category',
            },
            name: { type: 'string', examples: ['doggie'] },
            photoUrls: {
              type: 'array',
              items: { type: 'string', examples: ['https://example.com/photo.png'] },
            },
            tags: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: 'string' },
                },
                title: 'Tag',
                'x-readme-ref-name': 'Tag',
              },
            },
            status: {
              type: 'string',
              description: 'pet status in the store\n\n`available` `pending` `sold`',
              enum: ['available', 'pending', 'sold'],
            },
          },
          title: 'Pet',
          'x-readme-ref-name': 'Pet',
        },
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  findPetsByTags: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            tags: {
              type: 'array',
              items: { type: 'string' },
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Tags to filter by',
            },
          },
          required: ['tags'],
        },
      ],
    },
    response: {
      '200': {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'photoUrls'],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
              readOnly: true,
              default: 40,
              examples: [25],
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
            },
            category: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  format: 'int64',
                  minimum: -9223372036854776000,
                  maximum: 9223372036854776000,
                },
                name: { type: 'string' },
              },
              title: 'Category',
              'x-readme-ref-name': 'Category',
            },
            name: { type: 'string', examples: ['doggie'] },
            photoUrls: {
              type: 'array',
              items: { type: 'string', examples: ['https://example.com/photo.png'] },
            },
            tags: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
                    minimum: -9223372036854776000,
                    maximum: 9223372036854776000,
                  },
                  name: { type: 'string' },
                },
                title: 'Tag',
                'x-readme-ref-name': 'Tag',
              },
            },
            status: {
              type: 'string',
              description: 'pet status in the store\n\n`available` `pending` `sold`',
              enum: ['available', 'pending', 'sold'],
            },
          },
          title: 'Pet',
          'x-readme-ref-name': 'Pet',
        },
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getPetById: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            petId: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'ID of pet to return',
            },
          },
          required: ['petId'],
        },
      ],
    },
  },
  updatePetWithForm: {
    formData: {
      type: 'object',
      properties: {
        name: { description: 'Updated name of the pet', type: 'string' },
        status: { description: 'Updated status of the pet', type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            petId: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'ID of pet that needs to be updated',
            },
          },
          required: ['petId'],
        },
      ],
    },
  },
  deletePet: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            petId: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'Pet id to delete',
            },
          },
          required: ['petId'],
        },
        {
          type: 'object',
          properties: {
            api_key: { type: 'string', $schema: 'http://json-schema.org/draft-04/schema#' },
          },
          required: [],
        },
      ],
    },
  },
  uploadFile: {
    body: {
      type: 'object',
      properties: {
        additionalMetadata: { description: 'Additional data to pass to server', type: 'string' },
        file: { description: 'file to upload', type: 'string', format: 'binary' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            petId: {
              type: 'integer',
              format: 'int64',
              minimum: -9223372036854776000,
              maximum: 9223372036854776000,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'ID of pet to update',
            },
          },
          required: ['petId'],
        },
      ],
    },
  },
  getInventory: {
    response: {
      '200': {
        type: 'object',
        additionalProperties: {
          type: 'integer',
          format: 'int32',
          minimum: -2147483648,
          maximum: 2147483647,
        },
        $schema: 'http://json-schema.org/draft-04/schema#',
      },
    },
  },
  getOrderById: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            orderId: {
              type: 'integer',
              format: 'int64',
              minimum: 1,
              maximum: 10,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'ID of pet that needs to be fetched',
            },
          },
          required: ['orderId'],
        },
      ],
    },
  },
  deleteOrder: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            orderId: {
              type: 'integer',
              format: 'int64',
              minimum: 1,
              maximum: 9223372036854776000,
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'ID of the order that needs to be deleted',
            },
          },
          required: ['orderId'],
        },
      ],
    },
  },
  createUsersWithArrayInput: {
    body: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
          },
          username: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          phone: { type: 'string' },
          userStatus: {
            type: 'integer',
            format: 'int32',
            description: 'User Status',
            minimum: -2147483648,
            maximum: 2147483647,
          },
        },
        title: 'User',
        'x-readme-ref-name': 'User',
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
  createUsersWithListInput: {
    body: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
          },
          username: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          phone: { type: 'string' },
          userStatus: {
            type: 'integer',
            format: 'int32',
            description: 'User Status',
            minimum: -2147483648,
            maximum: 2147483647,
          },
        },
        title: 'User',
        'x-readme-ref-name': 'User',
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
  loginUser: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'The user name for login',
            },
            password: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'The password for login in clear text',
            },
          },
          required: ['username', 'password'],
        },
      ],
    },
    response: { '200': { type: 'string', $schema: 'http://json-schema.org/draft-04/schema#' } },
  },
  getUserByName: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'The name that needs to be fetched. Use user1 for testing. ',
            },
          },
          required: ['username'],
        },
      ],
    },
  },
  updateUser: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'name that need to be updated',
            },
          },
          required: ['username'],
        },
      ],
    },
  },
  deleteUser: {
    metadata: {
      allOf: [
        {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              $schema: 'http://json-schema.org/draft-04/schema#',
              description: 'The name that needs to be deleted',
            },
          },
          required: ['username'],
        },
      ],
    },
  },
} as const;
type Pet = FromSchema<typeof schemas.$ref.Pet>;
type FindPetsByStatusMetadataParam = FromSchema<typeof schemas.findPetsByStatus.metadata>;
type FindPetsByStatusResponse200 = FromSchema<typeof schemas.findPetsByStatus.response['200']>;
type FindPetsByTagsMetadataParam = FromSchema<typeof schemas.findPetsByTags.metadata>;
type FindPetsByTagsResponse200 = FromSchema<typeof schemas.findPetsByTags.response['200']>;
type GetPetByIdMetadataParam = FromSchema<typeof schemas.getPetById.metadata>;
type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.updatePetWithForm.formData>;
type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.updatePetWithForm.metadata>;
type DeletePetMetadataParam = FromSchema<typeof schemas.deletePet.metadata>;
type UploadFileBodyParam = FromSchema<typeof schemas.uploadFile.body>;
type UploadFileMetadataParam = FromSchema<typeof schemas.uploadFile.metadata>;
type ApiResponse = FromSchema<typeof schemas.$ref.ApiResponse>;
type GetInventoryResponse200 = FromSchema<typeof schemas.getInventory.response['200']>;
type Order = FromSchema<typeof schemas.$ref.Order>;
type GetOrderByIdMetadataParam = FromSchema<typeof schemas.getOrderById.metadata>;
type DeleteOrderMetadataParam = FromSchema<typeof schemas.deleteOrder.metadata>;
type User = FromSchema<typeof schemas.$ref.User>;
type CreateUsersWithArrayInputBodyParam = FromSchema<typeof schemas.createUsersWithArrayInput.body>;
type CreateUsersWithListInputBodyParam = FromSchema<typeof schemas.createUsersWithListInput.body>;
type LoginUserMetadataParam = FromSchema<typeof schemas.loginUser.metadata>;
type LoginUserResponse200 = FromSchema<typeof schemas.loginUser.response['200']>;
type GetUserByNameMetadataParam = FromSchema<typeof schemas.getUserByName.metadata>;
type UpdateUserMetadataParam = FromSchema<typeof schemas.updateUser.metadata>;
type DeleteUserMetadataParam = FromSchema<typeof schemas.deleteUser.metadata>;
