import type { FromSchema } from '@readme/api-core/types';
import type * as schemas from './schemas.js';

export type GetAnythingMetadataParam = FromSchema<typeof schemas.GetAnything.metadata>;
export type GetAnythingResponse2XX = FromSchema<typeof schemas.GetAnything.response['2XX']>;
