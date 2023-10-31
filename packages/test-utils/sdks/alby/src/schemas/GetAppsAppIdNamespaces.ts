import NamespaceResponse from './NamespaceResponse.js';

const GetAppsAppIdNamespaces = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "app_id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
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
      "items": NamespaceResponse,
      "type": "array",
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetAppsAppIdNamespaces
