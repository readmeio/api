import type { FromSchema } from '@readme/api-core/types';
import * as schemas from './schemas';

export type UpdatePetWithFormFormDataParam = FromSchema<typeof schemas.UpdatePetWithForm.formData>;
export type UpdatePetWithFormMetadataParam = FromSchema<typeof schemas.UpdatePetWithForm.metadata>;
