const CreateCategory = {
  "body": {
    "type": "object",
    "title": "category",
    "x-readme-ref-name": "category",
    "required": [
      "title"
    ],
    "properties": {
      "title": {
        "type": "string",
        "description": "A short title for the category. This is what will show in the sidebar."
      },
      "type": {
        "type": "string",
        "enum": [
          "reference",
          "guide"
        ],
        "default": "guide",
        "description": "A category can be part of your reference or guide documentation, which is determined by this field."
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "x-readme-version": {
            "type": "string",
            "examples": [
              "v3.0"
            ],
            "description": "Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/main/reference/version#getversions."
          }
        }
      }
    ]
  }
} as const;
export default CreateCategory
