import Oas from 'oas';
import APICore from 'api/core';
import definition from './petstore.json';

export default class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][] = [];

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'api/1.0.0');
  }

  /**
   * Optionally configure various options, such as response parsing, that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.parseResponse If responses are parsed according to its `Content-Type` header`.
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
   * sdk.auth('username', 'password');')
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
  post<T = unknown>(path: string, body: Pet): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  post<T = unknown>(
    path: string,
    body: UpdatePetWithFormFormDataParam,
    metadata: UpdatePetWithFormMetadataParam
  ): Promise<T>;
  /**
   * Updates a pet in the store with form data
   *
   */
  post<T = unknown>(path: string, metadata: UpdatePetWithFormMetadataParam): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Create user
   */
  post<T = unknown>(path: string, body: User): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  post<T = unknown>(path: string, body: CreateUsersWithArrayInputBodyParam): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  post<T = unknown>(path: string, body: CreateUsersWithListInputBodyParam): Promise<T>;
  /**
   * Uploads an image
   *
   */
  post(path: string, body: UploadFileBodyParam, metadata: UploadFileMetadataParam): Promise<ApiResponse>;
  /**
   * Uploads an image
   *
   */
  post(path: string, metadata: UploadFileMetadataParam): Promise<ApiResponse>;
  /**
   * Place an order for a pet
   *
   */
  post(path: string, body: Order): Promise<Order>;
  /**
   * Access any post endpoint on your API.
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
  put<T = unknown>(path: string, body: Pet): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Updated user
   */
  put<T = unknown>(path: string, body: User, metadata: UpdateUserMetadataParam): Promise<T>;
  /**
   * Access any put endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  put<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'put', body, metadata);
  }

  /**
   * Logs out current logged in user session
   *
   */
  get<T = unknown>(path: string): Promise<T>;
  /**
   * Returns a map of status codes to quantities
   *
   * @summary Returns pet inventories by status
   */
  get(path: string): Promise<GetInventory_Response_200>;
  /**
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  get(path: string, metadata: FindPetsByStatusMetadataParam): Promise<FindPetsByStatus_Response_200>;
  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  get(path: string, metadata: FindPetsByTagsMetadataParam): Promise<FindPetsByTags_Response_200>;
  /**
   * Returns a single pet
   *
   * @summary Find pet by ID
   */
  get(path: string, metadata: GetPetByIdMetadataParam): Promise<Pet>;
  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
   *
   * @summary Find purchase order by ID
   */
  get(path: string, metadata: GetOrderByIdMetadataParam): Promise<Order>;
  /**
   * Logs user into the system
   *
   */
  get(path: string, metadata: LoginUserMetadataParam): Promise<LoginUser_Response_200>;
  /**
   * Get user by user name
   *
   */
  get(path: string, metadata: GetUserByNameMetadataParam): Promise<User>;
  /**
   * Access any get endpoint on your API.
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
  delete<T = unknown>(path: string, metadata: DeletePetMetadataParam): Promise<T>;
  /**
   * For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
   *
   * @summary Delete purchase order by ID
   */
  delete<T = unknown>(path: string, metadata: DeleteOrderMetadataParam): Promise<T>;
  /**
   * This can only be done by the logged in user.
   *
   * @summary Delete user
   */
  delete<T = unknown>(path: string, metadata: DeleteUserMetadataParam): Promise<T>;
  /**
   * Access any delete endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  delete<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, 'delete', body, metadata);
  }

  /**
   * Logs out current logged in user session
   *
   */
  logoutUser<T = unknown>(): Promise<T> {
    return this.core.fetch('/user/logout', 'get');
  }

  /**
   * Returns a map of status codes to quantities
   *
   * @summary Returns pet inventories by status
   */
  getInventory(): Promise<GetInventory_Response_200> {
    return this.core.fetch('/store/inventory', 'get');
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

  /**
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  findPetsByStatus(metadata: FindPetsByStatusMetadataParam): Promise<FindPetsByStatus_Response_200> {
    return this.core.fetch('/pet/findByStatus', 'get', metadata);
  }

  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  findPetsByTags(metadata: FindPetsByTagsMetadataParam): Promise<FindPetsByTags_Response_200> {
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
   * Logs user into the system
   *
   */
  loginUser(metadata: LoginUserMetadataParam): Promise<LoginUser_Response_200> {
    return this.core.fetch('/user/login', 'get', metadata);
  }

  /**
   * Get user by user name
   *
   */
  getUserByName(metadata: GetUserByNameMetadataParam): Promise<User> {
    return this.core.fetch('/user/{username}', 'get', metadata);
  }
}

interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  /**
   * pet status in the store
   */
  status?: 'available' | 'pending' | 'sold';
  [k: string]: unknown;
}
export interface Category {
  id?: number;
  name?: string;
  [k: string]: unknown;
}
export interface Tag {
  id?: number;
  name?: string;
  [k: string]: unknown;
}
export type FindPetsByStatusMetadataParam = {
  /**
   * Status values that need to be considered for filter
   */
  status: ('available' | 'pending' | 'sold')[];
  [k: string]: unknown;
};
export type FindPetsByTagsMetadataParam = {
  /**
   * Tags to filter by
   */
  tags: string[];
  [k: string]: unknown;
};
export type GetPetByIdMetadataParam = {
  /**
   * ID of pet to return
   */
  petId: number;
  [k: string]: unknown;
};
export interface UpdatePetWithFormFormDataParam {
  /**
   * Updated name of the pet
   */
  name?: string;
  /**
   * Updated status of the pet
   */
  status?: string;
  [k: string]: unknown;
}
export type UpdatePetWithFormMetadataParam = {
  /**
   * ID of pet that needs to be updated
   */
  petId: number;
  [k: string]: unknown;
};
export type DeletePetMetadataParam = {
  /**
   * Pet id to delete
   */
  petId: number;
  [k: string]: unknown;
} & {
  api_key?: string;
  [k: string]: unknown;
};
export interface UploadFileBodyParam {
  /**
   * Additional data to pass to server
   */
  additionalMetadata?: string;
  /**
   * file to upload
   */
  file?: string;
  [k: string]: unknown;
}
export type UploadFileMetadataParam = {
  /**
   * ID of pet to update
   */
  petId: number;
  [k: string]: unknown;
};
export interface GetInventory_Response_200 {
  [k: string]: number;
}
export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  /**
   * Order Status
   */
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
  [k: string]: unknown;
}
export type GetOrderByIdMetadataParam = {
  /**
   * ID of pet that needs to be fetched
   */
  orderId: number;
  [k: string]: unknown;
};
export type DeleteOrderMetadataParam = {
  /**
   * ID of the order that needs to be deleted
   */
  orderId: number;
  [k: string]: unknown;
};
export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /**
   * User Status
   */
  userStatus?: number;
  [k: string]: unknown;
}
export type CreateUsersWithArrayInputBodyParam = User[];
export type CreateUsersWithListInputBodyParam = User[];
export type LoginUserMetadataParam = {
  /**
   * The user name for login
   */
  username: string;
  /**
   * The password for login in clear text
   */
  password: string;
  [k: string]: unknown;
};
export type GetUserByNameMetadataParam = {
  /**
   * The name that needs to be fetched. Use user1 for testing.
   */
  username: string;
  [k: string]: unknown;
};
export type UpdateUserMetadataParam = {
  /**
   * name that need to be updated
   */
  username: string;
  [k: string]: unknown;
};
export type DeleteUserMetadataParam = {
  /**
   * The name that needs to be deleted
   */
  username: string;
  [k: string]: unknown;
};
export type FindPetsByStatus_Response_200 = Pet[];
export type FindPetsByTags_Response_200 = Pet[];
export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
  [k: string]: unknown;
}
export type LoginUser_Response_200 = string;
