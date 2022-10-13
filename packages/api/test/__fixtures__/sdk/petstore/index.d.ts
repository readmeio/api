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
   * Add a new pet to the store
   *
   */
  addPet<T = unknown>(body: Pet): Promise<T>;
  /**
   * Update an existing pet
   *
   */
  updatePet<T = unknown>(body: Pet): Promise<T>;
  /**
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  findPetsByStatus(metadata: FindPetsByStatusMetadataParam): Promise<FindPetsByStatusResponse200>;
  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  findPetsByTags(metadata: FindPetsByTagsMetadataParam): Promise<FindPetsByTagsResponse200>;
  /**
   * Returns a single pet
   *
   * @summary Find pet by ID
   */
  getPetById(metadata: GetPetByIdMetadataParam): Promise<Pet>;
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
   * Deletes a pet
   *
   */
  deletePet<T = unknown>(metadata: DeletePetMetadataParam): Promise<T>;
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
   * Returns a map of status codes to quantities
   *
   * @summary Returns pet inventories by status
   */
  getInventory(): Promise<GetInventoryResponse200>;
  /**
   * Place an order for a pet
   *
   */
  placeOrder(body: Order): Promise<Order>;
  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
   *
   * @summary Find purchase order by ID
   */
  getOrderById(metadata: GetOrderByIdMetadataParam): Promise<Order>;
  /**
   * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
   *
   * @summary Delete purchase order by ID
   */
  deleteOrder<T = unknown>(metadata: DeleteOrderMetadataParam): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Create user
   */
  createUser<T = unknown>(body: User): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  createUsersWithArrayInput<T = unknown>(body: CreateUsersWithArrayInputBodyParam): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  createUsersWithListInput<T = unknown>(body: CreateUsersWithListInputBodyParam): Promise<T>;
  /**
   * Logs user into the system
   *
   */
  loginUser(metadata: LoginUserMetadataParam): Promise<LoginUserResponse200>;
  /**
   * Logs out current logged in user session
   *
   */
  logoutUser<T = unknown>(): Promise<T>;
  /**
   * Get user by user name
   *
   */
  getUserByName(metadata: GetUserByNameMetadataParam): Promise<User>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Updated user
   */
  updateUser<T = unknown>(body: User, metadata: UpdateUserMetadataParam): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Delete user
   */
  deleteUser<T = unknown>(metadata: DeleteUserMetadataParam): Promise<T>;
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
  readonly $ref: {
    readonly Pet: {
      readonly type: 'object';
      readonly required: readonly ['name', 'photoUrls'];
      readonly properties: {
        readonly id: {
          readonly type: 'integer';
          readonly format: 'int64';
          readonly readOnly: true;
          readonly default: 40;
          readonly examples: readonly [25];
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly category: {
          readonly type: 'object';
          readonly properties: {
            readonly id: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
            };
            readonly name: {
              readonly type: 'string';
            };
          };
          readonly title: 'Category';
          readonly 'x-readme-ref-name': 'Category';
        };
        readonly name: {
          readonly type: 'string';
          readonly examples: readonly ['doggie'];
        };
        readonly photoUrls: {
          readonly type: 'array';
          readonly items: {
            readonly type: 'string';
            readonly examples: readonly ['https://example.com/photo.png'];
          };
        };
        readonly tags: {
          readonly type: 'array';
          readonly items: {
            readonly type: 'object';
            readonly properties: {
              readonly id: {
                readonly type: 'integer';
                readonly format: 'int64';
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
              };
              readonly name: {
                readonly type: 'string';
              };
            };
            readonly title: 'Tag';
            readonly 'x-readme-ref-name': 'Tag';
          };
        };
        readonly status: {
          readonly type: 'string';
          readonly description: 'pet status in the store';
          readonly enum: readonly ['available', 'pending', 'sold'];
        };
      };
      readonly title: 'Pet';
      readonly 'x-readme-ref-name': 'Pet';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly ApiResponse: {
      readonly type: 'object';
      readonly properties: {
        readonly code: {
          readonly type: 'integer';
          readonly format: 'int32';
          readonly minimum: -2147483648;
          readonly maximum: 2147483647;
        };
        readonly type: {
          readonly type: 'string';
        };
        readonly message: {
          readonly type: 'string';
        };
      };
      readonly title: 'ApiResponse';
      readonly 'x-readme-ref-name': 'ApiResponse';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly Order: {
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly type: 'integer';
          readonly format: 'int64';
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly petId: {
          readonly type: 'integer';
          readonly format: 'int64';
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly quantity: {
          readonly type: 'integer';
          readonly format: 'int32';
          readonly minimum: -2147483648;
          readonly maximum: 2147483647;
        };
        readonly shipDate: {
          readonly type: 'string';
          readonly format: 'date-time';
        };
        readonly status: {
          readonly type: 'string';
          readonly description: 'Order Status';
          readonly enum: readonly ['placed', 'approved', 'delivered'];
        };
        readonly complete: {
          readonly type: 'boolean';
          readonly default: false;
        };
      };
      readonly title: 'Order';
      readonly 'x-readme-ref-name': 'Order';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly User: {
      readonly type: 'object';
      readonly properties: {
        readonly id: {
          readonly type: 'integer';
          readonly format: 'int64';
          readonly minimum: -9223372036854776000;
          readonly maximum: 9223372036854776000;
        };
        readonly username: {
          readonly type: 'string';
        };
        readonly firstName: {
          readonly type: 'string';
        };
        readonly lastName: {
          readonly type: 'string';
        };
        readonly email: {
          readonly type: 'string';
        };
        readonly password: {
          readonly type: 'string';
        };
        readonly phone: {
          readonly type: 'string';
        };
        readonly userStatus: {
          readonly type: 'integer';
          readonly format: 'int32';
          readonly description: 'User Status';
          readonly minimum: -2147483648;
          readonly maximum: 2147483647;
        };
      };
      readonly title: 'User';
      readonly 'x-readme-ref-name': 'User';
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
  readonly findPetsByStatus: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly status: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'string';
                readonly enum: readonly ['available', 'pending', 'sold'];
                readonly default: 'available';
              };
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Status values that need to be considered for filter';
            };
          };
          readonly required: readonly ['status'];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'array';
        readonly items: {
          readonly type: 'object';
          readonly required: readonly ['name', 'photoUrls'];
          readonly properties: {
            readonly id: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly readOnly: true;
              readonly default: 40;
              readonly examples: readonly [25];
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
            };
            readonly category: {
              readonly type: 'object';
              readonly properties: {
                readonly id: {
                  readonly type: 'integer';
                  readonly format: 'int64';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly name: {
                  readonly type: 'string';
                };
              };
              readonly title: 'Category';
              readonly 'x-readme-ref-name': 'Category';
            };
            readonly name: {
              readonly type: 'string';
              readonly examples: readonly ['doggie'];
            };
            readonly photoUrls: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'string';
                readonly examples: readonly ['https://example.com/photo.png'];
              };
            };
            readonly tags: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'object';
                readonly properties: {
                  readonly id: {
                    readonly type: 'integer';
                    readonly format: 'int64';
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                  };
                  readonly name: {
                    readonly type: 'string';
                  };
                };
                readonly title: 'Tag';
                readonly 'x-readme-ref-name': 'Tag';
              };
            };
            readonly status: {
              readonly type: 'string';
              readonly description: 'pet status in the store\n\n`available` `pending` `sold`';
              readonly enum: readonly ['available', 'pending', 'sold'];
            };
          };
          readonly title: 'Pet';
          readonly 'x-readme-ref-name': 'Pet';
        };
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly findPetsByTags: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly tags: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'string';
              };
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Tags to filter by';
            };
          };
          readonly required: readonly ['tags'];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'array';
        readonly items: {
          readonly type: 'object';
          readonly required: readonly ['name', 'photoUrls'];
          readonly properties: {
            readonly id: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly readOnly: true;
              readonly default: 40;
              readonly examples: readonly [25];
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
            };
            readonly category: {
              readonly type: 'object';
              readonly properties: {
                readonly id: {
                  readonly type: 'integer';
                  readonly format: 'int64';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly name: {
                  readonly type: 'string';
                };
              };
              readonly title: 'Category';
              readonly 'x-readme-ref-name': 'Category';
            };
            readonly name: {
              readonly type: 'string';
              readonly examples: readonly ['doggie'];
            };
            readonly photoUrls: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'string';
                readonly examples: readonly ['https://example.com/photo.png'];
              };
            };
            readonly tags: {
              readonly type: 'array';
              readonly items: {
                readonly type: 'object';
                readonly properties: {
                  readonly id: {
                    readonly type: 'integer';
                    readonly format: 'int64';
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                  };
                  readonly name: {
                    readonly type: 'string';
                  };
                };
                readonly title: 'Tag';
                readonly 'x-readme-ref-name': 'Tag';
              };
            };
            readonly status: {
              readonly type: 'string';
              readonly description: 'pet status in the store\n\n`available` `pending` `sold`';
              readonly enum: readonly ['available', 'pending', 'sold'];
            };
          };
          readonly title: 'Pet';
          readonly 'x-readme-ref-name': 'Pet';
        };
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getPetById: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly petId: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of pet to return';
            };
          };
          readonly required: readonly ['petId'];
        }
      ];
    };
  };
  readonly updatePetWithForm: {
    readonly formData: {
      readonly type: 'object';
      readonly properties: {
        readonly name: {
          readonly description: 'Updated name of the pet';
          readonly type: 'string';
        };
        readonly status: {
          readonly description: 'Updated status of the pet';
          readonly type: 'string';
        };
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly petId: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of pet that needs to be updated';
            };
          };
          readonly required: readonly ['petId'];
        }
      ];
    };
  };
  readonly deletePet: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly petId: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'Pet id to delete';
            };
          };
          readonly required: readonly ['petId'];
        },
        {
          readonly type: 'object';
          readonly properties: {
            readonly api_key: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
            };
          };
          readonly required: readonly [];
        }
      ];
    };
  };
  readonly uploadFile: {
    readonly body: {
      readonly type: 'object';
      readonly properties: {
        readonly additionalMetadata: {
          readonly description: 'Additional data to pass to server';
          readonly type: 'string';
        };
        readonly file: {
          readonly description: 'file to upload';
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
            readonly petId: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: -9223372036854776000;
              readonly maximum: 9223372036854776000;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of pet to update';
            };
          };
          readonly required: readonly ['petId'];
        }
      ];
    };
  };
  readonly getInventory: {
    readonly response: {
      readonly '200': {
        readonly type: 'object';
        readonly additionalProperties: {
          readonly type: 'integer';
          readonly format: 'int32';
          readonly minimum: -2147483648;
          readonly maximum: 2147483647;
        };
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getOrderById: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly orderId: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: 1;
              readonly maximum: 10;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of pet that needs to be fetched';
            };
          };
          readonly required: readonly ['orderId'];
        }
      ];
    };
  };
  readonly deleteOrder: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly orderId: {
              readonly type: 'integer';
              readonly format: 'int64';
              readonly minimum: 1;
              readonly maximum: 9223372036854776000;
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'ID of the order that needs to be deleted';
            };
          };
          readonly required: readonly ['orderId'];
        }
      ];
    };
  };
  readonly createUsersWithArrayInput: {
    readonly body: {
      readonly type: 'array';
      readonly items: {
        readonly type: 'object';
        readonly properties: {
          readonly id: {
            readonly type: 'integer';
            readonly format: 'int64';
            readonly minimum: -9223372036854776000;
            readonly maximum: 9223372036854776000;
          };
          readonly username: {
            readonly type: 'string';
          };
          readonly firstName: {
            readonly type: 'string';
          };
          readonly lastName: {
            readonly type: 'string';
          };
          readonly email: {
            readonly type: 'string';
          };
          readonly password: {
            readonly type: 'string';
          };
          readonly phone: {
            readonly type: 'string';
          };
          readonly userStatus: {
            readonly type: 'integer';
            readonly format: 'int32';
            readonly description: 'User Status';
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
          };
        };
        readonly title: 'User';
        readonly 'x-readme-ref-name': 'User';
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
  readonly createUsersWithListInput: {
    readonly body: {
      readonly type: 'array';
      readonly items: {
        readonly type: 'object';
        readonly properties: {
          readonly id: {
            readonly type: 'integer';
            readonly format: 'int64';
            readonly minimum: -9223372036854776000;
            readonly maximum: 9223372036854776000;
          };
          readonly username: {
            readonly type: 'string';
          };
          readonly firstName: {
            readonly type: 'string';
          };
          readonly lastName: {
            readonly type: 'string';
          };
          readonly email: {
            readonly type: 'string';
          };
          readonly password: {
            readonly type: 'string';
          };
          readonly phone: {
            readonly type: 'string';
          };
          readonly userStatus: {
            readonly type: 'integer';
            readonly format: 'int32';
            readonly description: 'User Status';
            readonly minimum: -2147483648;
            readonly maximum: 2147483647;
          };
        };
        readonly title: 'User';
        readonly 'x-readme-ref-name': 'User';
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
  readonly loginUser: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly username: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'The user name for login';
            };
            readonly password: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'The password for login in clear text';
            };
          };
          readonly required: readonly ['username', 'password'];
        }
      ];
    };
    readonly response: {
      readonly '200': {
        readonly type: 'string';
        readonly $schema: 'http://json-schema.org/draft-04/schema#';
      };
    };
  };
  readonly getUserByName: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly username: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'The name that needs to be fetched. Use user1 for testing. ';
            };
          };
          readonly required: readonly ['username'];
        }
      ];
    };
  };
  readonly updateUser: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly username: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'name that need to be updated';
            };
          };
          readonly required: readonly ['username'];
        }
      ];
    };
  };
  readonly deleteUser: {
    readonly metadata: {
      readonly allOf: readonly [
        {
          readonly type: 'object';
          readonly properties: {
            readonly username: {
              readonly type: 'string';
              readonly $schema: 'http://json-schema.org/draft-04/schema#';
              readonly description: 'The name that needs to be deleted';
            };
          };
          readonly required: readonly ['username'];
        }
      ];
    };
  };
};
declare type Pet = FromSchema<typeof schemas.$ref.Pet>;
declare type FindPetsByStatusMetadataParam = FromSchema<typeof schemas.findPetsByStatus.metadata>;
declare type FindPetsByStatusResponse200 = FromSchema<
  typeof schemas.findPetsByStatus.response['200']
>;
declare type FindPetsByTagsMetadataParam = FromSchema<typeof schemas.findPetsByTags.metadata>;
declare type FindPetsByTagsResponse200 = FromSchema<typeof schemas.findPetsByTags.response['200']>;
declare type GetPetByIdMetadataParam = FromSchema<typeof schemas.getPetById.metadata>;
declare type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.updatePetWithForm.formData>;
declare type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.updatePetWithForm.metadata>;
declare type DeletePetMetadataParam = FromSchema<typeof schemas.deletePet.metadata>;
declare type UploadFileBodyParam = FromSchema<typeof schemas.uploadFile.body>;
declare type UploadFileMetadataParam = FromSchema<typeof schemas.uploadFile.metadata>;
declare type ApiResponse = FromSchema<typeof schemas.$ref.ApiResponse>;
declare type GetInventoryResponse200 = FromSchema<typeof schemas.getInventory.response['200']>;
declare type Order = FromSchema<typeof schemas.$ref.Order>;
declare type GetOrderByIdMetadataParam = FromSchema<typeof schemas.getOrderById.metadata>;
declare type DeleteOrderMetadataParam = FromSchema<typeof schemas.deleteOrder.metadata>;
declare type User = FromSchema<typeof schemas.$ref.User>;
declare type CreateUsersWithArrayInputBodyParam = FromSchema<
  typeof schemas.createUsersWithArrayInput.body
>;
declare type CreateUsersWithListInputBodyParam = FromSchema<
  typeof schemas.createUsersWithListInput.body
>;
declare type LoginUserMetadataParam = FromSchema<typeof schemas.loginUser.metadata>;
declare type LoginUserResponse200 = FromSchema<typeof schemas.loginUser.response['200']>;
declare type GetUserByNameMetadataParam = FromSchema<typeof schemas.getUserByName.metadata>;
declare type UpdateUserMetadataParam = FromSchema<typeof schemas.updateUser.metadata>;
declare type DeleteUserMetadataParam = FromSchema<typeof schemas.deleteUser.metadata>;
