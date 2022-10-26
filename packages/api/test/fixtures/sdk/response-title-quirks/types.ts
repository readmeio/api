import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type GetAnythingMetadataParam = FromSchema<typeof schemas.getAnything.metadata>;
export type GetAnythingResponse2XX = FromSchema<typeof schemas.getAnything.response['2XX']>;
