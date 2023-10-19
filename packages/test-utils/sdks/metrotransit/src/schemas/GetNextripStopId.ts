const GetNextripStopId = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "stop_id": {
            "type": "integer",
            "format": "int32",
            "minimum": -2147483648,
            "maximum": 2147483647,
            "$schema": "http://json-schema.org/draft-04/schema#"
          }
        },
        "required": [
          "stop_id"
        ]
      }
    ]
  }
} as const;
export default GetNextripStopId
