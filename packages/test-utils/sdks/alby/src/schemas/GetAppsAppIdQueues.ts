import QueueResponse from './QueueResponse.js';

const GetAppsAppIdQueues = {
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
  },
  "response": {
    "200": {
      "items": QueueResponse,
      "type": "array",
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetAppsAppIdQueues
