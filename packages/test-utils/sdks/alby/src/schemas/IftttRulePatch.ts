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
  "x-source": {
    "additionalProperties": false,
    "properties": {
      "channelFilter": {
        "description": "This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.",
        "type": "string"
      },
      "type": {
        "description": "The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.",
        "enum": [
          "channel.message",
          "channel.presence",
          "channel.lifecycle",
          "channel.occupancy"
        ],
        "example": "channel.message",
        "type": "string"
      }
    },
    "required": [
      "channelFilter",
      "type"
    ],
    "type": "object",
    "title": "rule_source",
    "x-readme-ref-name": "rule_source"
  },
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
