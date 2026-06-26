import type { OASDocument } from 'oas/types';

import Oas from 'oas';
import OASNormalize from 'oas-normalize';

export async function dereferenceAndInit(json: OASDocument): Promise<Oas> {
  const normalize = new OASNormalize(json, {
    parser: {
      dereference: {
        circular: 'ignore',
      },
    },
  });

  return normalize.dereference().then(d => Oas.init(d as OASDocument));
}
