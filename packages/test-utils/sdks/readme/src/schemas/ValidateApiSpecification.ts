import ErrorSpecFileEmpty from './ErrorSpecFileEmpty.js';
import ErrorSpecInvalid from './ErrorSpecInvalid.js';
import ErrorSpecInvalidSchema from './ErrorSpecInvalidSchema.js';

const ValidateApiSpecification = {
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
  "response": {
    "400": {
      "oneOf": [
        ErrorSpecFileEmpty,
        ErrorSpecInvalid,
        ErrorSpecInvalidSchema
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ValidateApiSpecification
