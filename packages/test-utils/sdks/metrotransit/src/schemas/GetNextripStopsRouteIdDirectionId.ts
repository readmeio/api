import Place from './Place.js';

const GetNextripStopsRouteIdDirectionId = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "route_id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#"
          },
          "direction_id": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647,
            "$schema": "http://json-schema.org/draft-04/schema#"
          }
        },
        "required": [
          "route_id",
          "direction_id"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "array",
      "items": Place,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetNextripStopsRouteIdDirectionId
