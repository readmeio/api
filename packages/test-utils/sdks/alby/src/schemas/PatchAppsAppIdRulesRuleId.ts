const PatchAppsAppIdRulesRuleId = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "app_id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "The application ID."
          },
          "rule_id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
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
export default PatchAppsAppIdRulesRuleId
