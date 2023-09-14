import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type Category = FromSchema<typeof schemas.Category>;
export type FindPetsByStatusMetadataParam = FromSchema<typeof schemas.FindPetsByStatus.metadata>;
export type FindPetsByStatusResponse200 = FromSchema<typeof schemas.FindPetsByStatus.response['200']>;
export type Pet = FromSchema<typeof schemas.Pet>;
export type Tag = FromSchema<typeof schemas.Tag>;
