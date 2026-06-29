const DeleteAppsAppIdRulesRuleId = {
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
          "rule_id": {
            "type": "string",
            "description": "The rule ID."
          }
        },
        "required": [
          "app_id",
          "rule_id"
        ]
      }
    ]
  }
} as const;
export default DeleteAppsAppIdRulesRuleId
