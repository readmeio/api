import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.updatePetWithForm.formData>;
export type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.updatePetWithForm.metadata>;
