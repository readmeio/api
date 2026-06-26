import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';

const CreateCustomPage = {
  "body": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Title of the custom page."
      },
      "body": {
        "type": "string",
        "description": "Body formatted in Markdown (displayed by default)."
      },
      "html": {
        "type": "string",
        "description": "Body formatted in HTML (sanitized, only displayed if `htmlmode` is **true**)."
      },
      "htmlmode": {
        "type": "boolean",
        "description": "**true** if `html` should be displayed, **false** if `body` should be displayed.",
        "default": false
      },
      "hidden": {
        "type": "boolean",
        "description": "Visibility of the custom page.",
        "default": true
      }
    },
    "required": [
      "title"
    ],
    "title": "customPage",
    "x-readme-ref-name": "customPage",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "response": {
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
export default CreateCustomPage
