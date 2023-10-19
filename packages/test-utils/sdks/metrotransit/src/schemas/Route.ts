const Route = {
  "type": "object",
  "properties": {
    "route_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "agency_id": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "route_label": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "Route",
  "x-readme-ref-name": "Route"
} as const;
export default Route
