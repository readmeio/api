const Departure = {
  "type": "object",
  "properties": {
    "actual": {
      "type": "boolean"
    },
    "trip_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "stop_id": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "departure_text": {
      "type": [
        "string",
        "null"
      ]
    },
    "departure_time": {
      "type": "integer",
      "format": "int64",
      "minimum": -9223372036854776000,
      "maximum": 9223372036854776000
    },
    "description": {
      "type": [
        "string",
        "null"
      ]
    },
    "gate": {
      "type": [
        "string",
        "null"
      ]
    },
    "route_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "route_short_name": {
      "type": [
        "string",
        "null"
      ]
    },
    "direction_id": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "direction_text": {
      "type": [
        "string",
        "null"
      ]
    },
    "terminal": {
      "type": [
        "string",
        "null"
      ]
    },
    "schedule_relationship": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "additionalProperties": false,
  "title": "Departure",
  "x-readme-ref-name": "Departure"
} as const;
export default Departure
