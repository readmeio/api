import type { FromSchema } from '@readme/api-core/lib';
import * as schemas from './schemas';

export type GetAnythingMetadataParam = FromSchema<typeof schemas.GetAnything.metadata>;
export type GetAnythingResponse2XX = FromSchema<typeof schemas.GetAnything.response['2XX']>;
