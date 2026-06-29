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
  "x-readme-ref-name": "ApiResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ApiResponse
