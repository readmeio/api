const PostAppsAppIdQueues = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "app_id": {
            "type": "string",
            "description": "The application ID."
          }
        },
        "required": [
          "app_id"
        ]
      }
    ]
  }
} as const;
export default PostAppsAppIdQueues
