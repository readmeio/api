import Place from './Place.js';

const GetNextripStopsRouteIdDirectionId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "route_id": {
            "type": "string"
          },
          "direction_id": {
            "type": "integer",
            "format": "int32"
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
