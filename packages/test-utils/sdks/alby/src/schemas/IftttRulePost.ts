import RuleSource from './RuleSource.js';

const IftttRulePost = {
  "additionalProperties": false,
  "properties": {
    "requestMode": {
      "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
      "enum": [
        "single"
      ],
      "type": "string",
      "examples": [
        "single"
      ]
    },
    "ruleType": {
      "description": "The type of rule. In this case IFTTT. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
      "enum": [
        "http/ifttt"
      ],
      "type": "string"
    },
    "source": RuleSource,
    "status": {
      "description": "The status of the rule. Rules can be enabled or disabled.",
      "enum": [
        "enabled",
        "disabled"
      ],
      "type": "string",
      "examples": [
        "enabled"
      ]
    },
    "target": {
      "additionalProperties": false,
      "properties": {
        "eventName": {
          "type": "string"
        },
        "webhookKey": {
          "type": "string"
        }
      },
      "required": [
        "webhookKey",
        "eventName"
      ],
      "type": "object"
    }
  },
  "required": [
    "ruleType",
    "requestMode",
    "source",
    "target"
  ],
  "type": "object",
  "title": "ifttt_rule_post",
  "x-readme-ref-name": "ifttt_rule_post"
} as const;
export default IftttRulePost
