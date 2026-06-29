const Changelog = {
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the changelog."
    },
    "type": {
      "type": "string",
      "enum": [
        "",
        "added",
        "fixed",
        "improved",
        "deprecated",
        "removed"
      ]
    },
    "body": {
      "type": "string",
      "description": "Body content of the changelog."
    },
    "hidden": {
      "type": "boolean",
      "description": "Visibility of the changelog.",
      "default": true
    }
  },
  "required": [
    "title",
    "body"
  ],
  "title": "changelog",
  "x-readme-ref-name": "changelog",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default Changelog
