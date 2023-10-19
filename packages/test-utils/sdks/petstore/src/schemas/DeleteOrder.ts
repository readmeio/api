const DeleteOrder = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "orderId": {
            "type": "integer",
            "format": "int64",
            "minimum": 1,
            "maximum": 9223372036854776000,
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "ID of the order that needs to be deleted"
          }
        },
        "required": [
          "orderId"
        ]
      }
    ]
  }
} as const;
export default DeleteOrder
