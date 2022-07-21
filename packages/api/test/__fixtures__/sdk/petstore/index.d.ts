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
  post<T = unknown>(path: '/user/createWithArray', body: CreateUsersWithArrayInputBodyParam): Promise<T>;
  /**
   * Creates list of users with given input array
   *
   */
  post<T = unknown>(path: '/user/createWithList', body: CreateUsersWithListInputBodyParam): Promise<T>;
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
  put<T = unknown>(path: '/user/{username}', body: User, metadata: UpdateUserMetadataParam): Promise<T>;
  /**
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  get(path: '/pet/findByStatus', metadata: FindPetsByStatusMetadataParam): Promise<FindPetsByStatus_Response_200>;
  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  get(path: '/pet/findByTags', metadata: FindPetsByTagsMetadataParam): Promise<FindPetsByTags_Response_200>;
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
  get(path: '/store/inventory'): Promise<GetInventory_Response_200>;
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
  get(path: '/user/login', metadata: LoginUserMetadataParam): Promise<LoginUser_Response_200>;
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
  delete<T = unknown>(path: '/store/order/{orderId}', metadata: DeleteOrderMetadataParam): Promise<T>;
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
  findPetsByStatus(metadata: FindPetsByStatusMetadataParam): Promise<FindPetsByStatus_Response_200>;
  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   *
   * @summary Finds Pets by tags
   */
  findPetsByTags(metadata: FindPetsByTagsMetadataParam): Promise<FindPetsByTags_Response_200>;
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
  getInventory(): Promise<GetInventory_Response_200>;
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
  loginUser(metadata: LoginUserMetadataParam): Promise<LoginUser_Response_200>;
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
export default function createSDK(): SDK;
interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  /**
   * pet status in the store
   *
   * `available` `pending` `sold`
   */
  status?: 'available' | 'pending' | 'sold';
  [k: string]: unknown;
}
interface Category {
  id?: number;
  name?: string;
  [k: string]: unknown;
}
interface Tag {
  id?: number;
  name?: string;
  [k: string]: unknown;
}
declare type FindPetsByStatusMetadataParam = {
  /**
   * Status values that need to be considered for filter
   */
  status: ('available' | 'pending' | 'sold')[];
  [k: string]: unknown;
};
declare type FindPetsByStatus_Response_200 = Pet[];
declare type FindPetsByTagsMetadataParam = {
  /**
   * Tags to filter by
   */
  tags: string[];
  [k: string]: unknown;
};
declare type FindPetsByTags_Response_200 = Pet[];
declare type GetPetByIdMetadataParam = {
  /**
   * ID of pet to return
   */
  petId: number;
  [k: string]: unknown;
};
interface UpdatePetWithFormFormDataParam {
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
declare type UpdatePetWithFormMetadataParam = {
  /**
   * ID of pet that needs to be updated
   */
  petId: number;
  [k: string]: unknown;
};
declare type DeletePetMetadataParam = {
  /**
   * Pet id to delete
   */
  petId: number;
  [k: string]: unknown;
} & {
  api_key?: string;
  [k: string]: unknown;
};
interface UploadFileBodyParam {
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
declare type UploadFileMetadataParam = {
  /**
   * ID of pet to update
   */
  petId: number;
  [k: string]: unknown;
};
interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
  [k: string]: unknown;
}
interface GetInventory_Response_200 {
  [k: string]: number;
}
interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  /**
   * Order Status
   *
   * `placed` `approved` `delivered`
   */
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
  [k: string]: unknown;
}
declare type GetOrderByIdMetadataParam = {
  /**
   * ID of pet that needs to be fetched
   */
  orderId: number;
  [k: string]: unknown;
};
declare type DeleteOrderMetadataParam = {
  /**
   * ID of the order that needs to be deleted
   */
  orderId: number;
  [k: string]: unknown;
};
interface User {
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
declare type CreateUsersWithArrayInputBodyParam = User[];
declare type CreateUsersWithListInputBodyParam = User[];
declare type LoginUserMetadataParam = {
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
declare type LoginUser_Response_200 = string;
declare type GetUserByNameMetadataParam = {
  /**
   * The name that needs to be fetched. Use user1 for testing.
   */
  username: string;
  [k: string]: unknown;
};
declare type UpdateUserMetadataParam = {
  /**
   * name that need to be updated
   */
  username: string;
  [k: string]: unknown;
};
declare type DeleteUserMetadataParam = {
  /**
   * The name that needs to be deleted
   */
  username: string;
  [k: string]: unknown;
};
export {};
