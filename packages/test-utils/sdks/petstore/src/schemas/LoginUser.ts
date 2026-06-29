const LoginUser = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "username": {
            "type": "string",
            "description": "The user name for login"
          },
          "password": {
            "type": "string",
            "description": "The password for login in clear text"
          }
        },
        "required": [
          "username",
          "password"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "string",
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default LoginUser
