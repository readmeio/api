const GetInventory = {
  "response": {
    "200": {
      "type": "object",
      "additionalProperties": {
        "type": "integer",
        "format": "int32",
        "minimum": -2147483648,
        "maximum": 2147483647
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetInventory
