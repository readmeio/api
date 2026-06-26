const GetNextripStopId = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "stop_id": {
            "type": "integer",
            "format": "int32"
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
