import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';
import ErrorSpecFileEmpty from './ErrorSpecFileEmpty.js';
import ErrorSpecIdDuplicate from './ErrorSpecIdDuplicate.js';
import ErrorSpecIdInvalid from './ErrorSpecIdInvalid.js';
import ErrorSpecInvalid from './ErrorSpecInvalid.js';
import ErrorSpecInvalidSchema from './ErrorSpecInvalidSchema.js';
import ErrorSpecVersionNotfound from './ErrorSpecVersionNotfound.js';

const UpdateApiSpecification = {
  "body": {
    "type": "object",
    "properties": {
      "spec": {
        "description": "An OpenAPI/Swagger file. We accept JSON or YAML.",
        "type": "string",
        "format": "binary"
      },
      "url": {
        "description": "A public URL to an OpenAPI/Swagger definition. We accept JSON or YAML.",
        "type": "string",
        "format": "url"
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page."
          }
        },
        "required": [
          "id"
        ]
      }
    ]
  },
  "response": {
    "400": {
      "oneOf": [
        ErrorSpecFileEmpty,
        ErrorSpecIdDuplicate,
        ErrorSpecIdInvalid,
        ErrorSpecInvalid,
        ErrorSpecInvalidSchema,
        ErrorSpecVersionNotfound
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
export default UpdateApiSpecification
