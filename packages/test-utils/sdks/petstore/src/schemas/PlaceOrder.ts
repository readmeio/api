const PlaceOrder = {
  "body": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "petId": {
        "type": "integer",
        "format": "int64"
      },
      "quantity": {
        "type": "integer",
        "format": "int32"
      },
      "shipDate": {
        "type": "string",
        "format": "date-time"
      },
      "status": {
        "type": "string",
        "description": "Order Status",
        "enum": [
          "placed",
          "approved",
          "delivered"
        ]
      },
      "complete": {
        "type": "boolean",
        "default": false
      }
    },
    "title": "Order",
    "x-readme-ref-name": "Order",
    "$schema": "http://json-schema.org/draft-04/schema#"
  }
} as const;
export default PlaceOrder
