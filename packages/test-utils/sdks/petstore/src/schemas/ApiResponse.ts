const ApiResponse = {
  "type": "object",
  "properties": {
    "code": {
      "type": "integer",
      "format": "int32",
      "minimum": -2147483648,
      "maximum": 2147483647
    },
    "type": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "title": "ApiResponse",
  "x-readme-ref-name": "ApiResponse"
} as const;
export default ApiResponse
