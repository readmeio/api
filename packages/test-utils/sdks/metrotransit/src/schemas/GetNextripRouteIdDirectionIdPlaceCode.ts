const GetNextripRouteIdDirectionIdPlaceCode = {
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
          },
          "place_code": {
            "type": "string"
          }
        },
        "required": [
          "route_id",
          "direction_id",
          "place_code"
        ]
      }
    ]
  }
} as const;
export default GetNextripRouteIdDirectionIdPlaceCode
