import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';
import ErrorSpecFileEmpty from './ErrorSpecFileEmpty';
import ErrorSpecIdDuplicate from './ErrorSpecIdDuplicate';
import ErrorSpecIdInvalid from './ErrorSpecIdInvalid';
import ErrorSpecInvalid from './ErrorSpecInvalid';
import ErrorSpecInvalidSchema from './ErrorSpecInvalidSchema';
import ErrorSpecVersionNotfound from './ErrorSpecVersionNotfound';

const UpdateApiSpecification = {
  "body": {
    "type": "object",
    "properties": {
      "spec": {
        "description": "OpenAPI/Swagger file. We accept JSON or YAML.",
        "type": "string",
        "format": "binary"
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
