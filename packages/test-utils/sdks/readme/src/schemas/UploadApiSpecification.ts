import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';
import ErrorSpecFileEmpty from './ErrorSpecFileEmpty.js';
import ErrorSpecInvalid from './ErrorSpecInvalid.js';
import ErrorSpecInvalidSchema from './ErrorSpecInvalidSchema.js';
import ErrorSpecVersionNotfound from './ErrorSpecVersionNotfound.js';

const UploadApiSpecification = {
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
          "x-readme-version": {
            "type": "string",
            "examples": [
              "v3.0"
            ],
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/main/reference/version#getversions."
          }
        },
        "required": []
      }
    ]
  },
  "response": {
    "400": {
      "oneOf": [
        ErrorSpecFileEmpty,
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
export default UploadApiSpecification
