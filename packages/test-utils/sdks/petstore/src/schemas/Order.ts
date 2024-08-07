const Order = {
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
  "x-readme-ref-name": "Order"
} as const;
export default Order
