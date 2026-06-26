import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';
import ErrorVersionDuplicate from './ErrorVersionDuplicate.js';
import ErrorVersionEmpty from './ErrorVersionEmpty.js';
import ErrorVersionForkEmpty from './ErrorVersionForkEmpty.js';

const CreateVersion = {
  "body": {
    "type": "object",
    "properties": {
      "version": {
        "type": "string",
        "description": "Semantic Version"
      },
      "codename": {
        "type": "string",
        "description": "Dubbed name of version."
      },
      "from": {
        "type": "string",
        "description": "Semantic Version to use as the base fork."
      },
      "is_stable": {
        "type": "boolean",
        "description": "Should this be the **main** version?"
      },
      "is_beta": {
        "type": "boolean",
        "default": true
      },
      "is_hidden": {
        "type": "boolean",
        "description": "Should this be publically accessible?"
      },
      "is_deprecated": {
        "type": "boolean",
        "description": "Should this be deprecated? Only allowed in PUT operations."
      },
      "pdfStatus": {
        "type": "string",
        "description": "Status of pdf generations."
      }
    },
    "required": [
      "version",
      "from"
    ],
    "title": "version",
    "x-readme-ref-name": "version",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
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
