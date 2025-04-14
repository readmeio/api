const Version = {
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
  "x-readme-ref-name": "version"
} as const;
export default Version
