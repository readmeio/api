import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';

const UpdateVersion = {
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
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "versionId": {
            "type": "string",
            "examples": [
              "v1.0.0"
            ],
            "description": "Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions)."
          }
        },
        "required": [
          "versionId"
        ]
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
export default UpdateVersion
