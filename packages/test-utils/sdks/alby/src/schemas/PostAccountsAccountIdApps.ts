const PostAccountsAccountIdApps = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "description": "The account ID of the account in which to create the application."
          }
        },
        "required": [
          "account_id"
        ]
      }
    ]
  }
} as const;
export default PostAccountsAccountIdApps
