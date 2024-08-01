const Agency = {
  "type": "object",
  "properties": {
    "agency_id": {
      "type": "integer",
      "format": "int32"
    },
    "agency_name": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "Agency",
  "x-readme-ref-name": "Agency"
} as const;
export default Agency
