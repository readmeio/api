import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type FindPetsByStatusMetadataParam = FromSchema<typeof schemas.findPetsByStatus.metadata>;
export type FindPetsByStatusResponse200 = FromSchema<
  typeof schemas.findPetsByStatus.response['200']
>;
