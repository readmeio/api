import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export declare type ApiResponse = FromSchema<typeof schemas.ApiResponse>;
export declare type Category = FromSchema<typeof schemas.Category>;
export declare type FindPetsByStatusMetadataParam = FromSchema<
  typeof schemas.findPetsByStatus.metadata
>;
export declare type FindPetsByStatusResponse200 = FromSchema<
  typeof schemas.findPetsByStatus.response['200']
>;
export declare type Order = FromSchema<typeof schemas.Order>;
export declare type Pet = FromSchema<typeof schemas.Pet>;
export declare type Tag = FromSchema<typeof schemas.Tag>;
export declare type User = FromSchema<typeof schemas.User>;
