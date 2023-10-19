import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';
import ErrorVersionDuplicate from './ErrorVersionDuplicate';
import ErrorVersionEmpty from './ErrorVersionEmpty';
import ErrorVersionForkEmpty from './ErrorVersionForkEmpty';

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
