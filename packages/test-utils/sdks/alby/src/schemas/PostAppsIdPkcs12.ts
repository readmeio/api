const PostAppsIdPkcs12 = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The application ID."
          }
        },
        "required": [
          "id"
        ]
      }
    ]
  }
} as const;
export default PostAppsIdPkcs12
