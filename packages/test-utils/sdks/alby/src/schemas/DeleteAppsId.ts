const DeleteAppsId = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
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
