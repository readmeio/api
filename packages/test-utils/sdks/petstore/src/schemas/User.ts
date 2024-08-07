const User = {
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
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
      "description": "User Status"
    }
  },
  "title": "User",
  "x-readme-ref-name": "User"
} as const;
export default User
