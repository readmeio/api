const AwsAssumeRole = {
  "additionalProperties": false,
  "properties": {
    "assumeRoleArn": {
      "description": "If you are using the \"ARN of an assumable role\" authentication method, this is your Assume Role ARN. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.",
      "type": "string"
    },
    "authenticationMode": {
      "description": "Authentication method is using the ARN of an assumable role. See this <a href=\"https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis\">Ably knowledge base article</a> for details.\n\n`assumeRole`",
      "enum": [
        "assumeRole"
      ],
      "type": "string"
    }
  },
  "required": [
    "assumeRoleArn"
  ],
  "type": "object",
  "title": "aws_assume_role",
  "x-readme-ref-name": "aws_assume_role"
} as const;
export default AwsAssumeRole
