const Error = {
  "type": "object",
  "description": "Error object",
  "properties": {
    "code": {
      "type": "string",
      "description": "Error code"
    },
    "message": {
      "type": "string",
      "description": "Error message"
    }
  },
  "title": "Error",
  "x-readme-ref-name": "Error"
} as const;
export default Error
