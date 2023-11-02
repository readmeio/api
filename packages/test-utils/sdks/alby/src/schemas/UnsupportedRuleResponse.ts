import RuleSource from './RuleSource.js';

const UnsupportedRuleResponse = {
  "additionalProperties": false,
  "properties": {
    "_links": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": true
    },
    "appId": {
      "description": "The Ably application ID.",
      "type": "string",
      "examples": [
        "28GY6a"
      ]
    },
    "created": {
      "description": "Unix timestamp representing the date and time of creation of the rule.",
      "type": "number",
      "examples": [
        1602844091815
      ]
    },
    "id": {
      "description": "The rule ID.",
      "type": "string",
      "examples": [
        "83IzAB"
      ]
    },
    "modified": {
      "description": "Unix timestamp representing the date and time of last modification of the rule.",
      "type": "number",
      "examples": [
        1614679682091
      ]
    },
    "requestMode": {
      "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
      "enum": [
        "single",
        "batch"
      ],
      "type": "string",
      "examples": [
        "single"
      ]
    },
    "ruleType": {
      "description": "This rule type is currently unsupported.",
      "enum": [
        "unsupported"
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
        "url": {
          "type": "string"
        }
      },
      "required": [
        "url"
      ],
      "type": "object"
    },
    "version": {
      "description": "API version. Events and the format of their payloads are versioned. Please see the <a href=\"https://ably.com/documentation/general/events\">Events documentation</a>.",
      "type": "string"
    }
  },
  "required": [
    "ruleType",
    "requestMode",
    "source",
    "target"
  ],
  "type": "object",
  "title": "unsupported_rule_response",
  "x-readme-ref-name": "unsupported_rule_response"
} as const;
export default UnsupportedRuleResponse
