const GetNextripStopId = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "stop_id": {
            "type": "integer",
            "format": "int32",
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
