const ApiResponse = {
  "type": "object",
  "properties": {
    "code": {
      "type": "integer",
      "format": "int32"
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
