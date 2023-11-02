import RuleResponse from './RuleResponse.js';

const GetAppsAppIdRules = {
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
      "items": RuleResponse,
      "type": "array",
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetAppsAppIdRules
