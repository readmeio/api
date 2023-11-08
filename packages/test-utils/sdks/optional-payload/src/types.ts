import type { FromSchema } from '@readme/api-core/types';
import type * as schemas from './schemas.js';

export type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.UpdatePetWithForm.formData>;
export type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.UpdatePetWithForm.metadata>;
