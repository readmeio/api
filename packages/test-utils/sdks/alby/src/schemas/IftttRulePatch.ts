import RuleSource from './RuleSource.js';

const IftttRulePatch = {
  "x-requestMode": {
    "description": "Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href=\"https://ably.com/documentation/general/events#batching\">Ably documentation</a>.",
    "enum": [
      "single"
    ],
    "example": "single",
    "type": "string"
  },
  "x-ruleType": {
    "description": "The type of rule. In this case IFTTT. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
    "enum": [
      "http/ifttt"
    ],
    "type": "string"
  },
  "x-source": RuleSource,
  "x-target": {
    "additionalProperties": false,
    "properties": {
      "eventName": {
        "type": "string"
      },
      "webhookKey": {
        "type": "string"
      }
    },
    "type": "object"
  },
  "title": "ifttt_rule_patch",
  "x-readme-ref-name": "ifttt_rule_patch"
} as const;
export default IftttRulePatch
