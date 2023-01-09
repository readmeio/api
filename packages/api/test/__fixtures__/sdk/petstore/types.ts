import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type ApiResponse = FromSchema<typeof schemas.ApiResponse>;
export type Category = FromSchema<typeof schemas.Category>;
export type CreateUsersWithArrayInputBodyParam = FromSchema<
  typeof schemas.CreateUsersWithArrayInput.body
>;
export type CreateUsersWithListInputBodyParam = FromSchema<
  typeof schemas.CreateUsersWithListInput.body
>;
export type DeleteOrderMetadataParam = FromSchema<typeof schemas.DeleteOrder.metadata>;
export type DeletePetMetadataParam = FromSchema<typeof schemas.DeletePet.metadata>;
export type DeleteUserMetadataParam = FromSchema<typeof schemas.DeleteUser.metadata>;
export type FindPetsByStatusMetadataParam = FromSchema<typeof schemas.FindPetsByStatus.metadata>;
export type FindPetsByStatusResponse200 = FromSchema<
  (typeof schemas.FindPetsByStatus.response)['200']
>;
export type FindPetsByTagsMetadataParam = FromSchema<typeof schemas.FindPetsByTags.metadata>;
export type FindPetsByTagsResponse200 = FromSchema<(typeof schemas.FindPetsByTags.response)['200']>;
export type GetInventoryResponse200 = FromSchema<(typeof schemas.GetInventory.response)['200']>;
export type GetOrderByIdMetadataParam = FromSchema<typeof schemas.GetOrderById.metadata>;
export type GetPetByIdMetadataParam = FromSchema<typeof schemas.GetPetById.metadata>;
export type GetUserByNameMetadataParam = FromSchema<typeof schemas.GetUserByName.metadata>;
export type LoginUserMetadataParam = FromSchema<typeof schemas.LoginUser.metadata>;
export type LoginUserResponse200 = FromSchema<(typeof schemas.LoginUser.response)['200']>;
export type Order = FromSchema<typeof schemas.Order>;
export type Pet = FromSchema<typeof schemas.Pet>;
export type Tag = FromSchema<typeof schemas.Tag>;
export type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.UpdatePetWithForm.formData>;
export type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.UpdatePetWithForm.metadata>;
export type UpdateUserMetadataParam = FromSchema<typeof schemas.UpdateUser.metadata>;
export type UploadFileBodyParam = FromSchema<typeof schemas.UploadFile.body>;
export type UploadFileMetadataParam = FromSchema<typeof schemas.UploadFile.metadata>;
export type User = FromSchema<typeof schemas.User>;
