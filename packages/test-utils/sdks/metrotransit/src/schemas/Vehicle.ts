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
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "direction": {
      "type": [
        "string",
        "null"
      ]
    },
    "location_time": {
      "type": "integer",
      "format": "int64",
      "minimum": -9223372036854776000,
      "maximum": 9223372036854776000
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
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "longitude": {
      "type": "number",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "bearing": {
      "type": "number",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "odometer": {
      "type": "number",
      "format": "double",
      "minimum": -1.7976931348623157e+308,
      "maximum": 1.7976931348623157e+308
    },
    "speed": {
      "type": "number",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    }
  },
  "additionalProperties": false,
  "title": "Vehicle",
  "x-readme-ref-name": "Vehicle"
} as const;
export default Vehicle
