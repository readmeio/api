const RuleSource = {
  "additionalProperties": false,
  "properties": {
    "channelFilter": {
      "description": "This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.",
      "type": "string"
    },
    "type": {
      "description": "The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.\n\n`channel.message` `channel.presence` `channel.lifecycle` `channel.occupancy`",
      "enum": [
        "channel.message",
        "channel.presence",
        "channel.lifecycle",
        "channel.occupancy"
      ],
      "type": "string",
      "examples": [
        "channel.message"
      ]
    }
  },
  "required": [
    "channelFilter",
    "type"
  ],
  "type": "object",
  "title": "rule_source",
  "x-readme-ref-name": "rule_source"
} as const;
export default RuleSource
