const User = {
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64",
      "minimum": -9223372036854776000,
      "maximum": 9223372036854776000
    },
    "username": {
      "type": "string"
    },
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
    "phone": {
      "type": "string"
    },
    "userStatus": {
      "type": "integer",
      "format": "int32",
      "description": "User Status",
      "minimum": -2147483648,
      "maximum": 2147483647
    }
  },
  "title": "User",
  "x-readme-ref-name": "User"
} as const;
export default User
