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
      "format": "int32"
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
