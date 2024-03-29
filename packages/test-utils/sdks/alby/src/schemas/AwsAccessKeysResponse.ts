const AwsAccessKeysResponse = {
  "additionalProperties": false,
  "properties": {
    "accessKeyId": {
      "description": "The AWS key ID for the AWS IAM user. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
      "type": "string"
    },
    "authenticationMode": {
      "description": "Authentication method is using AWS credentials (AWS key ID and secret key).\n\n`credentials`",
      "enum": [
        "credentials"
      ],
      "type": "string"
    }
  },
  "type": "object",
  "title": "aws_access_keys_response",
  "x-readme-ref-name": "aws_access_keys_response"
} as const;
export default AwsAccessKeysResponse
