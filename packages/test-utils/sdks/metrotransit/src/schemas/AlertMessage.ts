const AlertMessage = {
  "type": "object",
  "properties": {
    "stop_closed": {
      "type": "boolean"
    },
    "alert_text": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "AlertMessage",
  "x-readme-ref-name": "AlertMessage"
} as const;
export default AlertMessage
