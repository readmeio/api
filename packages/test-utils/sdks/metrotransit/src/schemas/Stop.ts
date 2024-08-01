const Stop = {
  "type": "object",
  "properties": {
    "stop_id": {
      "type": "integer",
      "format": "int32"
    },
    "latitude": {
      "type": "number",
      "format": "double"
    },
    "longitude": {
      "type": "number",
      "format": "double"
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "Stop",
  "x-readme-ref-name": "Stop"
} as const;
export default Stop
