import AppResponse from './AppResponse.js';

const GetAccountsAccountIdApps = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "The account ID for which to retrieve the associated applications."
          }
        },
        "required": [
          "account_id"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "items": AppResponse,
      "type": "array",
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetAccountsAccountIdApps
