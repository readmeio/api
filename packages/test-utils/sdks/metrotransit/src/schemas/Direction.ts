const Direction = {
  "type": "object",
  "properties": {
    "direction_id": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "direction_name": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "Direction",
  "x-readme-ref-name": "Direction"
} as const;
export default Direction
