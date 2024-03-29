const Error = {
  "additionalProperties": false,
  "properties": {
    "code": {
      "description": "The HTTP status code returned.",
      "type": "integer"
    },
    "details": {
      "description": "Any additional details about the error message.",
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": true
    },
    "href": {
      "description": "The URL to documentation about the error code.",
      "type": "string"
    },
    "message": {
      "description": "The error message.",
      "type": "string"
    },
    "statusCode": {
      "description": "The Ably error code.",
      "type": "integer"
    }
  },
  "required": [
    "message",
    "code",
    "statusCode",
    "href"
  ],
  "type": "object",
  "title": "error",
  "x-readme-ref-name": "error"
} as const;
export default Error
