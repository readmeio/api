import Vehicle from './Vehicle.js';

const GetNextripVehiclesRouteId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "route_id": {
            "type": "string"
          }
        },
        "required": [
          "route_id"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "array",
      "items": Vehicle,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetNextripVehiclesRouteId
