const DeleteAppsAppIdQueuesQueueId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "app_id": {
            "type": "string",
            "description": "The application ID."
          },
          "queue_id": {
            "type": "string",
            "description": "The queue ID."
          }
        },
        "required": [
          "app_id",
          "queue_id"
        ]
      }
    ]
  }
} as const;
export default DeleteAppsAppIdQueuesQueueId
