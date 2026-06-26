const DeleteOrder = {
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
