const GetChangelog = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "slug": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the changelog \"Owlet Update\", enter the slug \"owlet-update\"."
          }
        },
        "required": [
          "slug"
        ]
      }
    ]
  }
} as const;
export default GetChangelog
