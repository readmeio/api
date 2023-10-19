const AwsAccessKeys = {
  "additionalProperties": false,
  "properties": {
    "accessKeyId": {
      "description": "The AWS key ID for the AWS IAM user. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
      "type": "string"
    },
    "authenticationMode": {
      "description": "Authentication method is using AWS credentials (AWS key ID and secret key).",
      "enum": [
        "credentials"
      ],
      "type": "string"
    },
    "secretAccessKey": {
      "description": "The AWS secret key for the AWS IAM user. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
      "type": "string"
    }
  },
  "required": [
    "accessKeyId",
    "secretAccessKey"
  ],
  "type": "object",
  "title": "aws_access_keys",
  "x-readme-ref-name": "aws_access_keys"
} as const;
export default AwsAccessKeys
