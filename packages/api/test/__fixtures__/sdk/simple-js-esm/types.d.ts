import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export declare type FindPetsByStatusMetadataParam = FromSchema<
  typeof schemas.findPetsByStatus.metadata
>;
export declare type FindPetsByStatusResponse200 = FromSchema<
  typeof schemas.findPetsByStatus.response['200']
>;
