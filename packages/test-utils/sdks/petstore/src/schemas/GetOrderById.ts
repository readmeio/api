const GetOrderById = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "integer",
            "format": "int64",
            "minimum": 1,
            "maximum": 10,
            "$schema": "http://json-schema.org/draft-04/schema#",
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
