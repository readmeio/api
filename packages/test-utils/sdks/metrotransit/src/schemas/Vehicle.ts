const Vehicle = {
  "type": "object",
  "properties": {
    "trip_id": {
      "type": [
        "string",
        "null"
      ]
    },
    "direction_id": {
      "type": "integer",
      "format": "int32"
    },
    "direction": {
      "type": [
        "string",
        "null"
      ]
    },
    "location_time": {
      "type": "integer",
      "format": "int64"
    },
    "route_id": {
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
    "latitude": {
      "type": "number",
      "format": "float"
    },
    "longitude": {
      "type": "number",
      "format": "float"
    },
    "bearing": {
      "type": "number",
      "format": "float"
    },
    "odometer": {
      "type": "number",
      "format": "double"
    },
    "speed": {
      "type": "number",
      "format": "float"
    }
  },
  "additionalProperties": false,
  "title": "Vehicle",
  "x-readme-ref-name": "Vehicle"
} as const;
export default Vehicle
