import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';

const DeleteDoc = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "slug": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "A URL-safe representation of the page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the title \"Getting Started\", enter the slug \"getting-started\"."
          }
        },
        "required": [
          "slug"
        ]
      },
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
export default DeleteDoc
