const Place = {
  "type": "object",
  "properties": {
    "place_code": {
      "type": [
        "string",
        "null"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "Place",
  "x-readme-ref-name": "Place"
} as const;
export default Place
