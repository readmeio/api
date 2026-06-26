const GetOrderById = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "orderId": {
            "type": "integer",
            "format": "int64",
            "minimum": 1,
            "maximum": 10,
            "description": "ID of pet that needs to be fetched"
          }
        },
        "required": [
          "orderId"
        ]
      }
    ]
  }
} as const;
export default GetOrderById
