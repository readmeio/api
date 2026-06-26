const DeleteAppsId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "The ID of the application to be deleted."
          }
        },
        "required": [
          "id"
        ]
      }
    ]
  }
} as const;
export default DeleteAppsId
