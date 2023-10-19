const DeleteCategory = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "slug": {
            "type": "string",
            "examples": [
              "getting-started"
            ],
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the category \"Getting Started\", enter the slug \"getting-started\"."
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
  }
} as const;
export default DeleteCategory
