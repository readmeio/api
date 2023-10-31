import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';
import ErrorVersionDuplicate from './ErrorVersionDuplicate.js';
import ErrorVersionEmpty from './ErrorVersionEmpty.js';
import ErrorVersionForkEmpty from './ErrorVersionForkEmpty.js';

const CreateVersion = {
  "response": {
    "400": {
      "oneOf": [
        ErrorVersionEmpty,
        ErrorVersionDuplicate,
        ErrorVersionForkEmpty
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    },
    "401": {
      "oneOf": [
        ErrorApikeyEmpty,
        ErrorApikeyNotfound
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    },
    "403": {
      "oneOf": [
        ErrorApikeyMismatch
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default CreateVersion
