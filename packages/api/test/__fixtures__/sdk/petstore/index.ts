import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from '@readme/oas-examples/3.0/json/petstore.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'petstore/1.0.0 (api/<<package version>>)');
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
   * Add a new pet to the store
   *
   */
  addPet(body: types.Pet): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pet', 'post', body);
  }

  /**
   * Update an existing pet
   *
   */
  updatePet(body: types.Pet): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pet', 'put', body);
  }

  /**
   * Multiple status values can be provided with comma separated strings
   *
   * @summary Finds Pets by status
   */
  findPetsByStatus(
    metadata: types.FindPetsByStatusMetadataParam
  ): Promise<FetchResponse<200, types.FindPetsByStatusResponse200>> {
    return this.core.fetch('/pet/findByStatus', 'get', metadata);
  }

  /**
   * Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for
   * testing.
   *
   * @summary Finds Pets by tags
   */
  findPetsByTags(
    metadata: types.FindPetsByTagsMetadataParam
  ): Promise<FetchResponse<200, types.FindPetsByTagsResponse200>> {
    return this.core.fetch('/pet/findByTags', 'get', metadata);
  }

  /**
   * Returns a single pet
   *
   * @summary Find pet by ID
   */
  getPetById(metadata: types.GetPetByIdMetadataParam): Promise<FetchResponse<200, types.Pet>> {
    return this.core.fetch('/pet/{petId}', 'get', metadata);
  }

  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm(
    body: types.UpdatePetWithFormFormDataParam,
    metadata: types.UpdatePetWithFormMetadataParam
  ): Promise<FetchResponse<number, unknown>>;
  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm(
    metadata: types.UpdatePetWithFormMetadataParam
  ): Promise<FetchResponse<number, unknown>>;
  /**
   * Updates a pet in the store with form data
   *
   */
  updatePetWithForm(
    body?: types.UpdatePetWithFormFormDataParam | types.UpdatePetWithFormMetadataParam,
    metadata?: types.UpdatePetWithFormMetadataParam
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pet/{petId}', 'post', body, metadata);
  }

  /**
   * Deletes a pet
   *
   */
  deletePet(metadata: types.DeletePetMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/pet/{petId}', 'delete', metadata);
  }

  /**
   * Uploads an image
   *
   */
  uploadFile(
    body: types.UploadFileBodyParam,
    metadata: types.UploadFileMetadataParam
  ): Promise<FetchResponse<200, types.ApiResponse>>;
  /**
   * Uploads an image
   *
   */
  uploadFile(
    metadata: types.UploadFileMetadataParam
  ): Promise<FetchResponse<200, types.ApiResponse>>;
  /**
   * Uploads an image
   *
   */
  uploadFile(
    body?: types.UploadFileBodyParam | types.UploadFileMetadataParam,
    metadata?: types.UploadFileMetadataParam
  ): Promise<FetchResponse<200, types.ApiResponse>> {
    return this.core.fetch('/pet/{petId}/uploadImage', 'post', body, metadata);
  }

  /**
   * Returns a map of status codes to quantities
   *
   * @summary Returns pet inventories by status
   */
  getInventory(): Promise<FetchResponse<200, types.GetInventoryResponse200>> {
    return this.core.fetch('/store/inventory', 'get');
  }

  /**
   * Place an order for a pet
   *
   */
  placeOrder(body: types.Order): Promise<FetchResponse<200, types.Order>> {
    return this.core.fetch('/store/order', 'post', body);
  }

  /**
   * For valid response try integer IDs with value >= 1 and <= 10. Other values will
   * generated exceptions
   *
   * @summary Find purchase order by ID
   */
  getOrderById(
    metadata: types.GetOrderByIdMetadataParam
  ): Promise<FetchResponse<200, types.Order>> {
    return this.core.fetch('/store/order/{orderId}', 'get', metadata);
  }

  /**
   * For valid response try integer IDs with positive integer value. Negative or non-integer
   * values will generate API errors
   *
   * @summary Delete purchase order by ID
   */
  deleteOrder(metadata: types.DeleteOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/store/order/{orderId}', 'delete', metadata);
  }

  /**
   * This can only be done by the logged in user.
   *
   * @summary Create user
   */
  createUser(body: types.User): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user', 'post', body);
  }

  /**
   * Creates list of users with given input array
   *
   */
  createUsersWithArrayInput(
    body: types.CreateUsersWithArrayInputBodyParam
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user/createWithArray', 'post', body);
  }

  /**
   * Creates list of users with given input array
   *
   */
  createUsersWithListInput(
    body: types.CreateUsersWithListInputBodyParam
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user/createWithList', 'post', body);
  }

  /**
   * Logs user into the system
   *
   */
  loginUser(
    metadata: types.LoginUserMetadataParam
  ): Promise<FetchResponse<200, types.LoginUserResponse200>> {
    return this.core.fetch('/user/login', 'get', metadata);
  }

  /**
   * Logs out current logged in user session
   *
   */
  logoutUser(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user/logout', 'get');
  }

  /**
   * Get user by user name
   *
   */
  getUserByName(
    metadata: types.GetUserByNameMetadataParam
  ): Promise<FetchResponse<200, types.User>> {
    return this.core.fetch('/user/{username}', 'get', metadata);
  }

  /**
   * This can only be done by the logged in user.
   *
   * @summary Updated user
   */
  updateUser(
    body: types.User,
    metadata: types.UpdateUserMetadataParam
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user/{username}', 'put', body, metadata);
  }

  /**
   * This can only be done by the logged in user.
   *
   * @summary Delete user
   */
  deleteUser(metadata: types.DeleteUserMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/user/{username}', 'delete', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  ApiResponse,
  Category,
  CreateUsersWithArrayInputBodyParam,
  CreateUsersWithListInputBodyParam,
  DeleteOrderMetadataParam,
  DeletePetMetadataParam,
  DeleteUserMetadataParam,
  FindPetsByStatusMetadataParam,
  FindPetsByStatusResponse200,
  FindPetsByTagsMetadataParam,
  FindPetsByTagsResponse200,
  GetInventoryResponse200,
  GetOrderByIdMetadataParam,
  GetPetByIdMetadataParam,
  GetUserByNameMetadataParam,
  LoginUserMetadataParam,
  LoginUserResponse200,
  Order,
  Pet,
  Tag,
  UpdatePetWithFormFormDataParam,
  UpdatePetWithFormMetadataParam,
  UpdateUserMetadataParam,
  UploadFileBodyParam,
  UploadFileMetadataParam,
  User,
} from './types';
