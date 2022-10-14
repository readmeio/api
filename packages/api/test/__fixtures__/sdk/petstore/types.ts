import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type ApiResponse = FromSchema<typeof schemas.$ref.ApiResponse>;
export type CreateUsersWithArrayInputBodyParam = FromSchema<
  typeof schemas.createUsersWithArrayInput.body
>;
export type CreateUsersWithListInputBodyParam = FromSchema<
  typeof schemas.createUsersWithListInput.body
>;
export type DeleteOrderMetadataParam = FromSchema<typeof schemas.deleteOrder.metadata>;
export type DeletePetMetadataParam = FromSchema<typeof schemas.deletePet.metadata>;
export type DeleteUserMetadataParam = FromSchema<typeof schemas.deleteUser.metadata>;
export type FindPetsByStatusMetadataParam = FromSchema<typeof schemas.findPetsByStatus.metadata>;
export type FindPetsByStatusResponse200 = FromSchema<
  typeof schemas.findPetsByStatus.response['200']
>;
export type FindPetsByTagsMetadataParam = FromSchema<typeof schemas.findPetsByTags.metadata>;
export type FindPetsByTagsResponse200 = FromSchema<typeof schemas.findPetsByTags.response['200']>;
export type GetInventoryResponse200 = FromSchema<typeof schemas.getInventory.response['200']>;
export type GetOrderByIdMetadataParam = FromSchema<typeof schemas.getOrderById.metadata>;
export type GetPetByIdMetadataParam = FromSchema<typeof schemas.getPetById.metadata>;
export type GetUserByNameMetadataParam = FromSchema<typeof schemas.getUserByName.metadata>;
export type LoginUserMetadataParam = FromSchema<typeof schemas.loginUser.metadata>;
export type LoginUserResponse200 = FromSchema<typeof schemas.loginUser.response['200']>;
export type Order = FromSchema<typeof schemas.$ref.Order>;
export type Pet = FromSchema<typeof schemas.$ref.Pet>;
export type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.updatePetWithForm.formData>;
export type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.updatePetWithForm.metadata>;
export type UpdateUserMetadataParam = FromSchema<typeof schemas.updateUser.metadata>;
export type UploadFileBodyParam = FromSchema<typeof schemas.uploadFile.body>;
export type UploadFileMetadataParam = FromSchema<typeof schemas.uploadFile.metadata>;
export type User = FromSchema<typeof schemas.$ref.User>;
