const AmqpExternalRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AMQP external (using Firehose). See the <a href="https://ably.com/documentation/general/firehose">Ably documentation</a> for further information.',
      enum: ['amqp/external'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        mandatoryRoute: {
          description:
            'Reject delivery of the message if the route does not exist, otherwise fail silently.',
          type: 'boolean',
        },
        messageTtl: {
          description:
            'You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.',
          type: 'integer',
        },
        persistentMessages: {
          description:
            'Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.',
          type: 'boolean',
        },
        routingKey: {
          description:
            'The AMQP routing key. See this <a href="https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule">Ably knowledge base article</a> for details.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'amqp_external_rule_patch',
  'x-readme-ref-name': 'amqp_external_rule_patch',
} as const;
const AmqpExternalRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AMQP external (using Firehose). See the <a href="https://ably.com/documentation/general/firehose">documentation</a> for further information.',
      enum: ['amqp/external'],
      type: 'string',
    },
    source: RuleSource,
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        mandatoryRoute: {
          description:
            'Reject delivery of the message if the route does not exist, otherwise fail silently.',
          type: 'boolean',
        },
        messageTtl: {
          description:
            'You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.',
          type: 'integer',
        },
        persistentMessages: {
          description:
            'Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.',
          type: 'boolean',
        },
        routingKey: {
          description:
            'The AMQP routing key. See this <a href="https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule">Ably knowledge base article</a> for details.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url', 'routingKey', 'mandatoryRoute', 'persistentMessages'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'amqp_external_rule_post',
  'x-readme-ref-name': 'amqp_external_rule_post',
} as const;
const AmqpExternalRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AMQP external (using Firehose). See the <a href="https://ably.com/documentation/general/firehose">Ably documentation</a> for further information.',
      enum: ['amqp/external'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        mandatoryRoute: {
          description:
            'Reject delivery of the message if the route does not exist, otherwise fail silently.',
          type: 'boolean',
        },
        messageTtl: {
          description:
            'You can optionally override the default TTL on a queue and specify a TTL in minutes for messages to be persisted. It is unusual to change the default TTL, so if this field is left empty, the default TTL for the queue will be used.',
          type: 'integer',
        },
        persistentMessages: {
          description:
            'Marks the message as persistent, instructing the broker to write it to disk if it is in a durable queue.',
          type: 'boolean',
        },
        routingKey: {
          description:
            'The AMQP routing key. See this <a href="https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule">Ably knowledge base article</a> for details.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url', 'routingKey', 'mandatoryRoute', 'persistentMessages'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'amqp_external_rule_response',
  'x-readme-ref-name': 'amqp_external_rule_response',
} as const;
const AmqpRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AMQP. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['amqp'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        queueId: { type: 'string' },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'amqp_rule_patch',
  'x-readme-ref-name': 'amqp_rule_patch',
} as const;
const AmqpRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AMQP. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['amqp'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        queueId: { type: 'string' },
      },
      required: ['queueId'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'amqp_rule_post',
  'x-readme-ref-name': 'amqp_rule_post',
} as const;
const AmqpRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AMQP. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['amqp'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        queueId: { type: 'string' },
      },
      required: ['queueId'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'amqp_rule_response',
  'x-readme-ref-name': 'amqp_rule_response',
} as const;
const AppPatch = {
  additionalProperties: false,
  properties: {
    apnsCertificate: {
      description: 'The Apple Push Notification service certificate.',
      type: 'string',
    },
    apnsPrivateKey: {
      description: 'The Apple Push Notification service private key.',
      type: 'string',
    },
    apnsUseSandboxEndpoint: {
      description: 'The Apple Push Notification service sandbox endpoint.',
      type: 'boolean',
    },
    fcmKey: { description: 'The Firebase Cloud Messaging key.', type: 'string', examples: [false] },
    name: {
      description: 'The name of the application for your reference only.',
      type: 'string',
      examples: ['My App'],
    },
    status: {
      description:
        'The status of the application. Can be `enabled` or `disabled`. Enabled means available to accept inbound connections and all services are available.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    tlsOnly: { description: 'Enforce TLS for all connections.', type: 'boolean', examples: [true] },
  },
  type: 'object',
  title: 'app_patch',
  'x-readme-ref-name': 'app_patch',
} as const;
const AppPkcs12 = {
  additionalProperties: false,
  properties: {
    p12File: {
      description: "The `.p12` file containing the app's APNs information.",
      format: 'binary',
      type: 'string',
    },
    p12Pass: { description: 'The password for the corresponding `.p12` file.', type: 'string' },
  },
  required: ['p12File', 'p12Pass'],
  type: 'object',
  title: 'app_pkcs12',
  'x-readme-ref-name': 'app_pkcs12',
} as const;
const AppPost = {
  additionalProperties: false,
  properties: {
    apnsCertificate: {
      description: 'The Apple Push Notification service certificate.',
      type: 'string',
    },
    apnsPrivateKey: {
      description: 'The Apple Push Notification service private key.',
      type: 'string',
    },
    apnsUseSandboxEndpoint: {
      description: 'The Apple Push Notification service sandbox endpoint.',
      type: 'boolean',
    },
    fcmKey: { description: 'The Firebase Cloud Messaging key.', type: 'string', examples: [false] },
    name: {
      description: 'The name of the application for your reference only.',
      type: 'string',
      examples: ['My App'],
    },
    status: {
      description:
        'The status of the application. Can be `enabled` or `disabled`. Enabled means available to accept inbound connections and all services are available.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    tlsOnly: { description: 'Enforce TLS for all connections.', type: 'boolean', examples: [true] },
  },
  required: ['name'],
  type: 'object',
  title: 'app_post',
  'x-readme-ref-name': 'app_post',
} as const;
const AppResponse = {
  additionalProperties: false,
  properties: {
    _links: {
      description: 'A link self-referencing the app that has been created.',
      type: 'object',
      additionalProperties: true,
    },
    accountId: {
      description: 'The ID of your Ably account.',
      type: 'string',
      examples: ['WgRpOB'],
    },
    apnsUseSandboxEndpoint: {
      description: 'Apple Push Notification service endpoint.',
      type: 'boolean',
      examples: [false],
    },
    id: { description: 'The application ID.', type: 'string', examples: ['28AB6x'] },
    name: { description: 'The application name.', type: 'string', examples: ['Default'] },
    status: {
      description:
        'The application status. Disabled applications will not accept new connections and will return an error to all clients.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    tlsOnly: {
      description: 'Enforce TLS for all connections. This setting overrides any channel setting.',
      type: 'boolean',
      examples: [true],
    },
  },
  type: 'object',
  title: 'app_response',
  'x-readme-ref-name': 'app_response',
} as const;
const AwsAccessKeys = {
  additionalProperties: false,
  properties: {
    accessKeyId: {
      description:
        'The AWS key ID for the AWS IAM user. See this <a href="https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis">Ably knowledge base article</a> for details.',
      type: 'string',
    },
    authenticationMode: {
      description: 'Authentication method is using AWS credentials (AWS key ID and secret key).',
      enum: ['credentials'],
      type: 'string',
    },
    secretAccessKey: {
      description:
        'The AWS secret key for the AWS IAM user. See this <a href="https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis">Ably knowledge base article</a> for details.',
      type: 'string',
    },
  },
  required: ['accessKeyId', 'secretAccessKey'],
  type: 'object',
  title: 'aws_access_keys',
  'x-readme-ref-name': 'aws_access_keys',
} as const;
const AwsAccessKeysResponse = {
  additionalProperties: false,
  properties: {
    accessKeyId: {
      description:
        'The AWS key ID for the AWS IAM user. See this <a href="https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis">Ably knowledge base article</a> for details.',
      type: 'string',
    },
    authenticationMode: {
      description: 'Authentication method is using AWS credentials (AWS key ID and secret key).',
      enum: ['credentials'],
      type: 'string',
    },
  },
  type: 'object',
  title: 'aws_access_keys_response',
  'x-readme-ref-name': 'aws_access_keys_response',
} as const;
const AwsAssumeRole = {
  additionalProperties: false,
  properties: {
    assumeRoleArn: {
      description:
        'If you are using the "ARN of an assumable role" authentication method, this is your Assume Role ARN. See this <a href="https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis">Ably knowledge base article</a> for details.',
      type: 'string',
    },
    authenticationMode: {
      description:
        'Authentication method is using the ARN of an assumable role. See this <a href="https://knowledge.ably.com/authentication-for-reactor-rules-for-aws-reactor-events-for-lambda-functions-reactor-firehose-for-aws-sqs-and-kinesis">Ably knowledge base article</a> for details.',
      enum: ['assumeRole'],
      type: 'string',
    },
  },
  required: ['assumeRoleArn'],
  type: 'object',
  title: 'aws_assume_role',
  'x-readme-ref-name': 'aws_assume_role',
} as const;
const AwsKinesisRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS Kinesis. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/kinesis'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeys, AwsAssumeRole],
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        partitionKey: {
          description:
            'The AWS Kinesis partition key. See this <a href="https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule">Ably knowledge base article</a> for details.',
          type: 'string',
        },
        region: {
          description:
            'The region is which AWS Kinesis is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
        streamName: { description: 'The name of your AWS Kinesis Stream.', type: 'string' },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'aws_kinesis_rule_patch',
  'x-readme-ref-name': 'aws_kinesis_rule_patch',
} as const;
const AwsKinesisRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS Kinesis. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/kinesis'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeys, AwsAssumeRole],
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        partitionKey: {
          description:
            'The AWS Kinesis partition key. See this <a href="https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule">Ably knowledge base article</a> for details.',
          type: 'string',
        },
        region: {
          description:
            'The region is which AWS Kinesis is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
        streamName: { description: 'The name of your AWS Kinesis Stream.', type: 'string' },
      },
      required: ['region', 'streamName', 'partitionKey', 'authentication', 'format'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_kinesis_rule_post',
  'x-readme-ref-name': 'aws_kinesis_rule_post',
} as const;
const AwsKinesisRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS Kinesis. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/kinesis'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys_response',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeysResponse, AwsAssumeRole],
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        partitionKey: {
          description:
            'The AWS Kinesis partition key. See this <a href="https://knowledge.ably.com/what-is-the-format-of-the-routingkey-for-an-amqp-or-kinesis-reactor-rule">Ably knowledge base article</a> for details.',
          type: 'string',
        },
        region: {
          description:
            'The region is which AWS Kinesis is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
        streamName: { description: 'The name of your AWS Kinesis Stream.', type: 'string' },
      },
      required: ['region', 'streamName', 'partitionKey', 'authentication', 'format'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_kinesis_rule_response',
  'x-readme-ref-name': 'aws_kinesis_rule_response',
} as const;
const AwsLambdaRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS Lambda. See the <a href="https://ably.com/integrations">Ably documentation</a> for further information.',
      enum: ['aws/lambda'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeys, AwsAssumeRole],
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        functionName: { description: 'The name of your AWS Lambda Function.', type: 'string' },
        region: {
          description:
            'The region is which your AWS Lambda Function is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
      },
      required: ['region', 'functionName', 'authentication'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_lambda_rule_patch',
  'x-readme-ref-name': 'aws_lambda_rule_patch',
} as const;
const AwsLambdaRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS Lambda. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/lambda'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeys, AwsAssumeRole],
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        functionName: { description: 'The name of your AWS Lambda Function.', type: 'string' },
        region: {
          description:
            'The region is which your AWS Lambda Function is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
      },
      required: ['region', 'functionName', 'authentication'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_lambda_rule_post',
  'x-readme-ref-name': 'aws_lambda_rule_post',
} as const;
const AwsLambdaRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS Lambda. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/lambda'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys_response',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeysResponse, AwsAssumeRole],
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        functionName: { description: 'The name of your AWS Lambda Function.', type: 'string' },
        region: {
          description:
            'The region is which your AWS Lambda Function is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
      },
      required: ['region', 'functionName', 'authentication'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_lambda_rule_response',
  'x-readme-ref-name': 'aws_lambda_rule_response',
} as const;
const AwsSqsRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS SQS. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/sqs'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeys, AwsAssumeRole],
        },
        awsAccountId: { description: 'Your AWS account ID.', type: 'string' },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        queueName: { description: 'The AWS SQS queue name.', type: 'string' },
        region: {
          description:
            'The region is which AWS SQS is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'aws_sqs_rule_patch',
  'x-readme-ref-name': 'aws_sqs_rule_patch',
} as const;
const AwsSqsRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS SQS. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/sqs'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeys, AwsAssumeRole],
        },
        awsAccountId: { description: 'Your AWS account ID.', type: 'string' },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        queueName: { description: 'The AWS SQS queue name.', type: 'string' },
        region: {
          description:
            'The region is which AWS SQS is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
      },
      required: ['region', 'awsAccountId', 'queueName', 'authentication'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_sqs_rule_post',
  'x-readme-ref-name': 'aws_sqs_rule_post',
} as const;
const AwsSqsRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case AWS SQS. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['aws/sqs'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        authentication: {
          discriminator: {
            mapping: {
              assumeRole: '#/components/schemas/aws_assume_role',
              credentials: '#/components/schemas/aws_access_keys_response',
            },
            propertyName: 'authenticationMode',
          },
          oneOf: [AwsAccessKeysResponse, AwsAssumeRole],
        },
        awsAccountId: { description: 'Your AWS account ID.', type: 'string' },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: { type: 'string' },
        queueName: { description: 'The AWS SQS queue name.', type: 'string' },
        region: {
          description:
            'The region is which AWS SQS is hosted. See the <a href="https://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region">AWS documentation</a> for more detail.',
          type: 'string',
          examples: ['us-west-1'],
        },
      },
      required: ['region', 'awsAccountId', 'queueName', 'authentication'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'aws_sqs_rule_response',
  'x-readme-ref-name': 'aws_sqs_rule_response',
} as const;
const AzureFunctionRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Microsoft Azure Function. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/azure-function'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        azureAppId: {
          description:
            'The Microsoft Azure Application ID. You can find your Microsoft Azure Application ID as shown in this <a href="https://dev.applicationinsights.io/documentation/Authorization/API-key-and-App-ID">article</a>.',
          type: 'string',
          examples: ['d1e9f419-c438-6032b32df979'],
        },
        azureFunctionName: {
          description: 'The name of your Microsoft Azure Function.',
          type: 'string',
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'azure_function_rule_patch',
  'x-readme-ref-name': 'azure_function_rule_patch',
} as const;
const AzureFunctionRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Microsoft Azure Function. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/azure-function'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        azureAppId: {
          description:
            'The Microsoft Azure Application ID. You can find your Microsoft Azure Application ID as shown in this <a href="https://dev.applicationinsights.io/documentation/Authorization/API-key-and-App-ID">article</a>.',
          type: 'string',
          examples: ['d1e9f419-c438-6032b32df979'],
        },
        azureFunctionName: {
          description: 'The name of your Microsoft Azure Function.',
          type: 'string',
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
      },
      required: ['azureAppId', 'azureFunctionName'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'azure_function_rule_post',
  'x-readme-ref-name': 'azure_function_rule_post',
} as const;
const AzureFunctionRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Microsoft Azure Function. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/azure-function'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        azureAppId: {
          description:
            'The Microsoft Azure Application ID. You can find your Microsoft Azure Application ID as shown in this <a href="https://dev.applicationinsights.io/documentation/Authorization/API-key-and-App-ID">article</a>.',
          type: 'string',
          examples: ['d1e9f419-c438-6032b32df979'],
        },
        azureFunctionName: {
          description: 'The name of your Microsoft Azure Function.',
          type: 'string',
        },
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
      },
      required: ['azureAppId', 'azureFunctionName'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'azure_function_rule_response',
  'x-readme-ref-name': 'azure_function_rule_response',
} as const;
const CloudflareWorkerRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Cloudflare Worker. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/cloudflare-worker'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'cloudflare_worker_rule_patch',
  'x-readme-ref-name': 'cloudflare_worker_rule_patch',
} as const;
const CloudflareWorkerRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Cloudflare Worker. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/cloudflare-worker'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'cloudflare_worker_rule_post',
  'x-readme-ref-name': 'cloudflare_worker_rule_post',
} as const;
const CloudflareWorkerRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Cloudflare Worker. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/cloudflare-worker'],
      type: 'string',
      examples: ['http/cloudflare-worker'],
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'cloudflare_worker_rule_response',
  'x-readme-ref-name': 'cloudflare_worker_rule_response',
} as const;
const DeleteAppsAppIdNamespacesNamespaceId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          namespace_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The namespace ID.',
          },
        },
        required: ['app_id', 'namespace_id'],
      },
    ],
  },
} as const;
const DeleteAppsAppIdQueuesQueueId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          queue_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The queue ID.',
          },
        },
        required: ['app_id', 'queue_id'],
      },
    ],
  },
} as const;
const DeleteAppsAppIdRulesRuleId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          rule_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The rule ID.',
          },
        },
        required: ['app_id', 'rule_id'],
      },
    ],
  },
} as const;
const DeleteAppsId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the application to be deleted.',
          },
        },
        required: ['id'],
      },
    ],
  },
} as const;
const Error = {
  additionalProperties: false,
  properties: {
    code: { description: 'The HTTP status code returned.', type: 'integer' },
    details: {
      description: 'Any additional details about the error message.',
      type: 'object',
      additionalProperties: true,
    },
    href: { description: 'The URL to documentation about the error code.', type: 'string' },
    message: { description: 'The error message.', type: 'string' },
    statusCode: { description: 'The Ably error code.', type: 'integer' },
  },
  required: ['message', 'code', 'statusCode', 'href'],
  type: 'object',
  title: 'error',
  'x-readme-ref-name': 'error',
} as const;
const GetAccountsAccountIdApps = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          account_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The account ID for which to retrieve the associated applications.',
          },
        },
        required: ['account_id'],
      },
    ],
  },
  response: {
    '200': {
      items: AppResponse,
      type: 'array',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAppsAppIdKeys = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
  response: {
    '200': {
      items: KeyResponse,
      type: 'array',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAppsAppIdNamespaces = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
  response: {
    '200': {
      items: NamespaceResponse,
      type: 'array',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAppsAppIdQueues = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
  response: {
    '200': {
      items: QueueResponse,
      type: 'array',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAppsAppIdRules = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
  response: {
    '200': {
      items: RuleResponse,
      type: 'array',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetAppsAppIdRulesRuleId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          rule_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The rule ID.',
          },
        },
        required: ['app_id', 'rule_id'],
      },
    ],
  },
} as const;
const GoogleCloudFunctionRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Google Cloud Function. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/google-cloud-function'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        functionName: { description: 'The name of your Google Cloud Function.', type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        projectId: {
          description:
            'The project ID for your Google Cloud Project that was generated when you created your project.',
          type: 'string',
        },
        region: {
          description:
            'The region in which your Google Cloud Function is hosted. See the <a href="https://cloud.google.com/compute/docs/regions-zones/">Google documentation</a> for more details.',
          type: 'string',
          examples: ['us-west1'],
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'google_cloud_function_rule_patch',
  'x-readme-ref-name': 'google_cloud_function_rule_patch',
} as const;
const GoogleCloudFunctionRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Google Cloud Function. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/google-cloud-function'],
      type: 'string',
    },
    source: RuleSource,
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        functionName: { description: 'The name of your Google Cloud Function.', type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        projectId: {
          description:
            'The project ID for your Google Cloud Project that was generated when you created your project.',
          type: 'string',
        },
        region: {
          description:
            'The region in which your Google Cloud Function is hosted. See the <a href="https://cloud.google.com/compute/docs/regions-zones/">Google documentation</a> for more details.',
          type: 'string',
          examples: ['us-west1'],
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
      },
      required: ['region', 'projectId', 'functionName'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'google_cloud_function_rule_post',
  'x-readme-ref-name': 'google_cloud_function_rule_post',
} as const;
const GoogleCloudFunctionRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Google Cloud Function. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/google-cloud-function'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description: 'JSON provides a text-based encoding.',
          enum: ['json'],
          type: 'string',
        },
        functionName: { description: 'The name of your Google Cloud Function.', type: 'string' },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        projectId: {
          description:
            'The project ID for your Google Cloud Project that was generated when you created your project.',
          type: 'string',
        },
        region: {
          description:
            'The region in which your Google Cloud Function is hosted. See the <a href="https://cloud.google.com/compute/docs/regions-zones/">Google documentation</a> for more details.',
          type: 'string',
          examples: ['us-west1'],
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
      },
      required: ['region', 'projectId', 'functionName'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'google_cloud_function_rule_response',
  'x-readme-ref-name': 'google_cloud_function_rule_response',
} as const;
const HttpRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description:
            'JSON provides a simpler text-based encoding, whereas MsgPack provides a more efficient binary encoding.',
          enum: ['json', 'msgpack'],
          type: 'string',
        },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'http_rule_patch',
  'x-readme-ref-name': 'http_rule_patch',
} as const;
const HttpRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description:
            'JSON provides a simpler text-based encoding, whereas MsgPack provides a more efficient binary encoding.',
          enum: ['json', 'msgpack'],
          type: 'string',
        },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: {
          description: 'The URL of the endpoint that is invoked when events occur on Ably.',
          type: 'string',
        },
      },
      required: ['url', 'format'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'http_rule_post',
  'x-readme-ref-name': 'http_rule_post',
} as const;
const HttpRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        enveloped: {
          description:
            'Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking "Enveloped" when setting up the rule.',
          type: 'boolean',
        },
        format: {
          description:
            'JSON provides a simpler text-based encoding, whereas MsgPack provides a more efficient binary encoding.',
          enum: ['json', 'msgpack'],
          type: 'string',
        },
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url', 'format'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'http_rule_response',
  'x-readme-ref-name': 'http_rule_response',
} as const;
const IftttRulePatch = {
  'x-requestMode': {
    description:
      'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
    enum: ['single'],
    example: 'single',
    type: 'string',
  },
  'x-ruleType': {
    description:
      'The type of rule. In this case IFTTT. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
    enum: ['http/ifttt'],
    type: 'string',
  },
  'x-source': {
    additionalProperties: false,
    properties: {
      channelFilter: {
        description:
          'This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.',
        type: 'string',
      },
      type: {
        description:
          'The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.',
        enum: ['channel.message', 'channel.presence', 'channel.lifecycle', 'channel.occupancy'],
        example: 'channel.message',
        type: 'string',
      },
    },
    required: ['channelFilter', 'type'],
    type: 'object',
    title: 'rule_source',
    'x-readme-ref-name': 'rule_source',
  },
  'x-target': {
    additionalProperties: false,
    properties: { eventName: { type: 'string' }, webhookKey: { type: 'string' } },
    type: 'object',
  },
  title: 'ifttt_rule_patch',
  'x-readme-ref-name': 'ifttt_rule_patch',
} as const;
const IftttRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case IFTTT. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/ifttt'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: { eventName: { type: 'string' }, webhookKey: { type: 'string' } },
      required: ['webhookKey', 'eventName'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'ifttt_rule_post',
  'x-readme-ref-name': 'ifttt_rule_post',
} as const;
const IftttRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'Single request mode sends each event separately to the endpoint specified by the rule. You can read more about single request mode events in the <a href="https://ably.com/documentation/general/events#batching">Ably documentation</a>.',
      enum: ['single'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case IFTTT. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/ifttt'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: { eventName: { type: 'string' }, webhookKey: { type: 'string' } },
      required: ['webhookKey', 'eventName'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'ifttt_rule_response',
  'x-readme-ref-name': 'ifttt_rule_response',
} as const;
const KeyPatch = {
  additionalProperties: false,
  properties: {
    capabilities: {
      description:
        'The capabilities that this key has. More information on capabilities can be found in the <a href="https://ably.com/documentation/core-features/authentication#capabilities-explained">Ably documentation</a>.',
      items: {
        enum: [
          'publish',
          'subscribe',
          'history',
          'presence',
          'channel-metadata',
          'push-admin',
          'push-subscribe',
          'statistics',
        ],
        type: 'string',
      },
      type: 'array',
    },
    channels: {
      description: 'Specify the channels and queues that this key can be used with.',
      type: 'string',
    },
    name: {
      description: 'The name for your API key. This is a friendly name for your reference.',
      type: 'string',
    },
  },
  type: 'object',
  title: 'key_patch',
  'x-readme-ref-name': 'key_patch',
} as const;
const KeyPost = {
  additionalProperties: false,
  properties: {
    capabilities: {
      description:
        'The capabilities that this key has. More information on capabilities can be found in the <a href="https://ably.com/documentation/core-features/authentication#capabilities-explained">Ably documentation</a>.',
      items: {
        enum: [
          'publish',
          'subscribe',
          'history',
          'presence',
          'channel-metadata',
          'push-admin',
          'push-subscribe',
          'statistics',
        ],
        type: 'string',
      },
      type: 'array',
    },
    channels: {
      description: 'Specify the channels and queues that this key can be used with.',
      type: 'string',
    },
    name: {
      description: 'The name for your API key. This is a friendly name for your reference.',
      type: 'string',
    },
  },
  required: ['name', 'channels', 'capabilities'],
  type: 'object',
  title: 'key_post',
  'x-readme-ref-name': 'key_post',
} as const;
const KeyResponse = {
  additionalProperties: false,
  properties: {
    appId: {
      description: 'The Ably application ID which this key is associated with.',
      type: 'string',
      examples: ['28GY6a'],
    },
    capability: {
      additionalProperties: {
        items: {
          enum: [
            'publish',
            'subscribe',
            'history',
            'presence',
            'channel-metadata',
            'push-admin',
            'push-subscribe',
            'statistics',
          ],
          type: 'string',
        },
        type: 'array',
      },
      description:
        'The capabilities that this key has. More information on capabilities can be found in the <a href="https://ably.com/documentation/core-features/authentication#capabilities-explained">Ably documentation</a>.',
      type: 'object',
    },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the key.',
      type: 'integer',
      examples: [1602844091815],
    },
    id: { description: 'The key ID.', type: 'string' },
    key: { description: 'The complete API key including API secret.', type: 'string' },
    modified: {
      description:
        'Unix timestamp representing the date and time of the last modification of the key.',
      type: 'integer',
      examples: [1614679682091],
    },
    name: {
      description: 'The name of the application this key is associated with.',
      type: 'string',
    },
  },
  type: 'object',
  title: 'key_response',
  'x-readme-ref-name': 'key_response',
} as const;
const Me = {
  additionalProperties: false,
  properties: {
    account: {
      additionalProperties: false,
      properties: {
        id: { description: 'The account ID.', type: 'string', examples: ['VpWaOA'] },
        name: {
          description: 'The name of the account.',
          type: 'string',
          examples: ['Free account'],
        },
      },
      required: ['id', 'name'],
      type: 'object',
    },
    token: {
      additionalProperties: false,
      properties: {
        capabilities: {
          description:
            'An array containing the access capabilities associated with the access token.',
          items: { type: 'string' },
          type: 'array',
          examples: [
            'write:namespace',
            'read:namespace',
            'write:queue',
            'read:queue',
            'write:rule',
            'read:rule',
            'write:key',
            'read:key',
            'write:app',
            'read:app',
          ],
        },
        id: {
          description: 'The token ID. This is a UUID.',
          type: 'integer',
          examples: ['C95837C9-184B-4CC2-8779-B769F960FADB'],
        },
        name: {
          description: 'The friendly name for the token.',
          type: 'string',
          examples: ['My Token'],
        },
      },
      required: ['id', 'name', 'capabilities'],
      type: 'object',
    },
    user: {
      additionalProperties: false,
      properties: {
        email: {
          description: 'Email address of the user associated with the account.',
          type: 'string',
        },
        id: {
          description: 'The user ID associated with the account. This is a UUID.',
          type: 'integer',
          examples: ['C95837C9-184B-4CC2-8779-B769F960FADB'],
        },
      },
      required: ['id', 'email'],
      type: 'object',
    },
  },
  type: 'object',
  title: 'me',
  'x-readme-ref-name': 'me',
} as const;
const NamespacePatch = {
  additionalProperties: false,
  properties: {
    authenticated: {
      default: false,
      description:
        'If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href="https://knowledge.ably.com/authenticated-and-identified-clients">Ably knowledge base/a> for more details.',
      type: 'boolean',
      examples: [false],
    },
    persistLast: {
      default: false,
      description:
        'If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.',
      type: 'boolean',
      examples: [false],
    },
    persisted: {
      default: false,
      description:
        'If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.',
      type: 'boolean',
      examples: [false],
    },
    pushEnabled: {
      default: false,
      description:
        'If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.',
      type: 'boolean',
      examples: [false],
    },
    tlsOnly: {
      default: false,
      description:
        'If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.',
      type: 'boolean',
      examples: [false],
    },
  },
  type: 'object',
  title: 'namespace_patch',
  'x-readme-ref-name': 'namespace_patch',
} as const;
const NamespacePost = {
  additionalProperties: false,
  properties: {
    authenticated: {
      default: false,
      description:
        'If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href="https://knowledge.ably.com/authenticated-and-identified-clients">Ably Knowledge base</a> for more details.',
      type: 'boolean',
      examples: [false],
    },
    id: {
      description:
        'The namespace or channel name that the channel rule will apply to. For example, if you specify `namespace` the namespace will be set to `namespace` and will match with channels `namespace:*` and `namespace`.',
      type: 'string',
      examples: ['namespace'],
    },
    persistLast: {
      default: false,
      description:
        'If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.',
      type: 'boolean',
      examples: [false],
    },
    persisted: {
      default: false,
      description:
        'If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.',
      type: 'boolean',
      examples: [false],
    },
    pushEnabled: {
      default: false,
      description:
        'If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.',
      type: 'boolean',
      examples: [false],
    },
    tlsOnly: {
      default: false,
      description:
        'If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.',
      type: 'boolean',
      examples: [false],
    },
  },
  required: ['id'],
  type: 'object',
  title: 'namespace_post',
  'x-readme-ref-name': 'namespace_post',
} as const;
const NamespaceResponse = {
  additionalProperties: false,
  properties: {
    authenticated: {
      default: false,
      description:
        'If `true`, clients will not be permitted to use (including to attach, publish, or subscribe) any channels within this namespace unless they are identified, that is, authenticated using a client ID. See the <a href="https://knowledge.ably.com/authenticated-and-identified-clients">Ably knowledge base</a> for more details.',
      type: 'boolean',
      examples: [false],
    },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the namespace.',
      type: 'integer',
      examples: [1602844091815],
    },
    id: {
      description:
        'The namespace or channel name that the channel rule will apply to. For example, if you specify `namespace` the namespace will be set to `namespace` and will match with channels `namespace:*` and `namespace`.',
      type: 'string',
      examples: ['namespace'],
    },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the namespace.',
      type: 'integer',
      examples: [1614679682091],
    },
    persistLast: {
      default: false,
      description:
        'If `true`, the last message published on a channel will be stored for 365 days. You can access the stored message only by using the channel rewind mechanism and attaching with rewind=1. Please note that for each message stored, an additional message is deducted from your monthly allocation.',
      type: 'boolean',
      examples: [false],
    },
    persisted: {
      default: false,
      description:
        'If `true`, all messages on a channel will be stored for 24 hours. You can access stored messages via the History API. Please note that for each message stored, an additional message is deducted from your monthly allocation.',
      type: 'boolean',
      examples: [false],
    },
    pushEnabled: {
      default: false,
      description:
        'If `true`, publishing messages with a push payload in the extras field is permitted and can trigger the delivery of a native push notification to registered devices for the channel.',
      type: 'boolean',
      examples: [false],
    },
    tlsOnly: {
      default: false,
      description:
        'If `true`, only clients that are connected using TLS will be permitted to subscribe to any channels within this namespace.',
      type: 'boolean',
      examples: [false],
    },
  },
  type: 'object',
  title: 'namespace_response',
  'x-readme-ref-name': 'namespace_response',
} as const;
const PatchAppsAppIdKeysKeyId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          key_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The API key ID.',
          },
        },
        required: ['app_id', 'key_id'],
      },
    ],
  },
} as const;
const PatchAppsAppIdNamespacesNamespaceId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          namespace_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The namespace ID.',
          },
        },
        required: ['app_id', 'namespace_id'],
      },
    ],
  },
} as const;
const PatchAppsAppIdRulesRuleId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          rule_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The rule ID.',
          },
        },
        required: ['app_id', 'rule_id'],
      },
    ],
  },
} as const;
const PatchAppsId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of application to be updated.',
          },
        },
        required: ['id'],
      },
    ],
  },
} as const;
const PostAccountsAccountIdApps = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          account_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The account ID of the account in which to create the application.',
          },
        },
        required: ['account_id'],
      },
    ],
  },
} as const;
const PostAppsAppIdKeys = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
} as const;
const PostAppsAppIdKeysKeyIdRevoke = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
          key_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The key ID.',
          },
        },
        required: ['app_id', 'key_id'],
      },
    ],
  },
} as const;
const PostAppsAppIdNamespaces = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
} as const;
const PostAppsAppIdQueues = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
} as const;
const PostAppsAppIdRules = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          app_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['app_id'],
      },
    ],
  },
} as const;
const PostAppsIdPkcs12 = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The application ID.',
          },
        },
        required: ['id'],
      },
    ],
  },
} as const;
const Queue = {
  additionalProperties: false,
  properties: {
    maxLength: {
      description: 'Message limit in number of messages.',
      type: 'integer',
      examples: [10000],
    },
    name: {
      description: 'A friendly name for your queue.',
      type: 'string',
      examples: ['My queue'],
    },
    region: {
      description:
        'The data center region. US East (Virginia) or EU West (Ireland). Values are `us-east-1-a` or `eu-west-1-a`.',
      type: 'string',
      examples: ['us-east-1-a'],
    },
    ttl: { description: 'TTL in minutes.', type: 'integer', examples: [60] },
  },
  required: ['name', 'ttl', 'maxLength', 'region'],
  type: 'object',
  title: 'queue',
  'x-readme-ref-name': 'queue',
} as const;
const QueueResponse = {
  additionalProperties: false,
  properties: {
    amqp: {
      additionalProperties: false,
      properties: {
        queueName: {
          description: 'Name of the Ably queue.',
          type: 'string',
          examples: ['28AB6w:My queue'],
        },
        uri: {
          description: 'URI for the AMQP queue interface.',
          type: 'string',
          examples: ['amqps://us-east-1-a-queue.ably.io:5671/shared'],
        },
      },
      type: 'object',
    },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28AB6w'] },
    deadletter: {
      description: 'A boolean that indicates whether this is a dead letter queue or not.',
      type: 'boolean',
      examples: [false],
    },
    deadletterId: { type: 'string', examples: ['28AB6w:us-east-1-a:deadletter'] },
    id: {
      description: 'The ID of the Ably queue',
      type: 'string',
      examples: ['28AB6w:us-east-1-a:My queue'],
    },
    maxLength: {
      description: 'Message limit in number of messages.',
      type: 'integer',
      examples: [10000],
    },
    messages: {
      additionalProperties: false,
      description: 'Details of messages in the queue.',
      properties: {
        ready: {
          description: 'The number of ready messages in the queue.',
          type: 'integer',
          examples: [0],
        },
        total: {
          description: 'The total number of messages in the queue.',
          type: 'integer',
          examples: [0],
        },
        unacknowledged: {
          description: 'The number of unacknowledged messages in the queue.',
          type: 'integer',
          examples: [0],
        },
      },
      type: 'object',
    },
    name: {
      description: 'The friendly name of the queue.',
      type: 'string',
      examples: ['My queue'],
    },
    region: {
      description: 'The data center region for the queue.',
      type: 'string',
      examples: ['eu-west-1-a'],
    },
    state: {
      description: 'The current state of the queue.',
      type: 'string',
      examples: ['Running'],
    },
    stats: {
      additionalProperties: false,
      properties: {
        acknowledgementRate: {
          description: 'The rate at which messages are acknowledged. Rate is messages per minute.',
          type: 'number',
        },
        deliveryRate: {
          description:
            'The rate at which messages are delivered from the queue. Rate is messages per minute.',
          type: 'number',
        },
        publishRate: {
          description:
            'The rate at which messages are published to the queue. Rate is messages per minute.',
          type: 'number',
        },
      },
      type: 'object',
    },
    stomp: {
      additionalProperties: false,
      properties: {
        destination: {
          description: 'Destination queue.',
          type: 'string',
          examples: ['/amqp/queue/28AB6w:My queue'],
        },
        host: { description: 'The host type for the queue.', type: 'string', examples: ['shared'] },
        uri: {
          description: 'URI for the STOMP queue interface.',
          type: 'string',
          examples: ['stomp://us-east-1-a-queue.ably.io:61614'],
        },
      },
      type: 'object',
    },
    ttl: { description: 'TTL in minutes.', type: 'integer', examples: [60] },
  },
  type: 'object',
  title: 'queue_response',
  'x-readme-ref-name': 'queue_response',
} as const;
const RuleAttributes = {
  additionalProperties: false,
  properties: {
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  type: 'object',
  title: 'rule_attributes',
  'x-readme-ref-name': 'rule_attributes',
} as const;
const RulePatch = {
  discriminator: {
    mapping: {
      amqp: '#/components/schemas/amqp_rule_patch',
      'amqp/external': '#/components/schemas/amqp_external_rule_patch',
      'aws/kinesis': '#/components/schemas/aws_kinesis_rule_patch',
      'aws/lambda': '#/components/schemas/aws_lambda_rule_patch',
      'aws/sqs': '#/components/schemas/aws_sqs_rule_patch',
      http: '#/components/schemas/http_rule_patch',
      'http/azure-function': '#/components/schemas/azure_function_rule_patch',
      'http/cloudflare-worker': '#/components/schemas/cloudflare_worker_rule_patch',
      'http/google-cloud-function': '#/components/schemas/google_cloud_function_rule_patch',
      'http/ifttt': '#/components/schemas/ifttt_rule_patch',
      'http/zapier': '#/components/schemas/zapier_rule_patch',
    },
    propertyName: 'ruleType',
  },
  oneOf: [
    HttpRulePatch,
    IftttRulePatch,
    ZapierRulePatch,
    CloudflareWorkerRulePatch,
    AzureFunctionRulePatch,
    GoogleCloudFunctionRulePatch,
    AwsLambdaRulePatch,
    AwsKinesisRulePatch,
    AwsSqsRulePatch,
    AmqpRulePatch,
    AmqpExternalRulePatch,
  ],
  title: 'rule_patch',
  'x-readme-ref-name': 'rule_patch',
} as const;
const RulePost = {
  discriminator: {
    mapping: {
      amqp: '#/components/schemas/amqp_rule_post',
      'amqp/external': '#/components/schemas/amqp_external_rule_post',
      'aws/kinesis': '#/components/schemas/aws_kinesis_rule_post',
      'aws/lambda': '#/components/schemas/aws_lambda_rule_post',
      'aws/sqs': '#/components/schemas/aws_sqs_rule_post',
      http: '#/components/schemas/http_rule_post',
      'http/azure-function': '#/components/schemas/azure_function_rule_post',
      'http/cloudflare-worker': '#/components/schemas/cloudflare_worker_rule_post',
      'http/google-cloud-function': '#/components/schemas/google_cloud_function_rule_post',
      'http/ifttt': '#/components/schemas/ifttt_rule_post',
      'http/zapier': '#/components/schemas/zapier_rule_post',
      unsupported: '#/components/schemas/unsupported_rule_response',
    },
    propertyName: 'ruleType',
  },
  oneOf: [
    HttpRulePost,
    IftttRulePost,
    ZapierRulePost,
    CloudflareWorkerRulePost,
    AzureFunctionRulePost,
    GoogleCloudFunctionRulePost,
    AwsLambdaRulePost,
    AwsKinesisRulePost,
    AwsSqsRulePost,
    AmqpRulePost,
    AmqpExternalRulePost,
    UnsupportedRuleResponse,
  ],
  title: 'rule_post',
  'x-readme-ref-name': 'rule_post',
} as const;
const RuleResponse = {
  discriminator: {
    mapping: {
      amqp: '#/components/schemas/amqp_rule_response',
      'amqp/external': '#/components/schemas/amqp_external_rule_response',
      'aws/kinesis': '#/components/schemas/aws_kinesis_rule_response',
      'aws/lambda': '#/components/schemas/aws_lambda_rule_response',
      'aws/sqs': '#/components/schemas/aws_sqs_rule_response',
      http: '#/components/schemas/http_rule_response',
      'http/azure-function': '#/components/schemas/azure_function_rule_response',
      'http/cloudflare-worker': '#/components/schemas/cloudflare_worker_rule_response',
      'http/google-cloud-function': '#/components/schemas/google_cloud_function_rule_response',
      'http/ifttt': '#/components/schemas/ifttt_rule_response',
      'http/zapier': '#/components/schemas/zapier_rule_response',
    },
    propertyName: 'ruleType',
  },
  oneOf: [
    HttpRuleResponse,
    IftttRuleResponse,
    ZapierRuleResponse,
    CloudflareWorkerRuleResponse,
    AzureFunctionRuleResponse,
    GoogleCloudFunctionRuleResponse,
    AwsLambdaRuleResponse,
    AwsKinesisRuleResponse,
    AwsSqsRuleResponse,
    AmqpRuleResponse,
    AmqpExternalRuleResponse,
  ],
  title: 'rule_response',
  'x-readme-ref-name': 'rule_response',
} as const;
const RuleSource = {
  additionalProperties: false,
  properties: {
    channelFilter: {
      description:
        'This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.',
      type: 'string',
    },
    type: {
      description:
        'The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.',
      enum: ['channel.message', 'channel.presence', 'channel.lifecycle', 'channel.occupancy'],
      type: 'string',
      examples: ['channel.message'],
    },
  },
  required: ['channelFilter', 'type'],
  type: 'object',
  title: 'rule_source',
  'x-readme-ref-name': 'rule_source',
} as const;
const RuleSourcePatch = {
  additionalProperties: false,
  properties: {
    channelFilter: {
      description:
        'This field allows you to filter your rule based on a regular expression that is matched against the complete channel name. Leave this empty if you want the rule to apply to all channels.',
      type: 'string',
    },
    type: {
      description:
        'The type `channel.message` delivers all messages published on a channel. The type `channel.presence` delivers all enter, update and leave events for members present on a channel. The type `channel.lifecycle` events for this rule type are currently not supported. Get in touch (https://ably.com/contact) if you need this feature. The type `channel.occupancy` delivers all occupancy events for the channel.',
      enum: ['channel.message', 'channel.presence', 'channel.lifecycle', 'channel.occupancy'],
      type: 'string',
    },
  },
  type: 'object',
  title: 'rule_source_patch',
  'x-readme-ref-name': 'rule_source_patch',
} as const;
const UnsupportedRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description: 'This rule type is currently unsupported.',
      enum: ['unsupported'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: { url: { type: 'string' } },
      required: ['url'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'unsupported_rule_response',
  'x-readme-ref-name': 'unsupported_rule_response',
} as const;
const ZapierRulePatch = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Zapier. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/zapier'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      type: 'object',
    },
  },
  type: 'object',
  title: 'zapier_rule_patch',
  'x-readme-ref-name': 'zapier_rule_patch',
} as const;
const ZapierRulePost = {
  additionalProperties: false,
  properties: {
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Zapier. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/zapier'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url'],
      type: 'object',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'zapier_rule_post',
  'x-readme-ref-name': 'zapier_rule_post',
} as const;
const ZapierRuleResponse = {
  additionalProperties: false,
  properties: {
    _links: { type: 'object', additionalProperties: true },
    appId: { description: 'The Ably application ID.', type: 'string', examples: ['28GY6a'] },
    created: {
      description: 'Unix timestamp representing the date and time of creation of the rule.',
      type: 'number',
      examples: [1602844091815],
    },
    id: { description: 'The rule ID.', type: 'string', examples: ['83IzAB'] },
    modified: {
      description:
        'Unix timestamp representing the date and time of last modification of the rule.',
      type: 'number',
      examples: [1614679682091],
    },
    requestMode: {
      description:
        'This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href="https://ably.com/documentation/general/events#batching">documentation</a>.',
      enum: ['single', 'batch'],
      type: 'string',
      examples: ['single'],
    },
    ruleType: {
      description:
        'The type of rule. In this case Zapier. See the <a href="https://ably.com/integrations">documentation</a> for further information.',
      enum: ['http/zapier'],
      type: 'string',
    },
    source: RuleSource,
    status: {
      description: 'The status of the rule. Rules can be enabled or disabled.',
      enum: ['enabled', 'disabled'],
      type: 'string',
      examples: ['enabled'],
    },
    target: {
      additionalProperties: false,
      properties: {
        headers: {
          description:
            "If you have additional information to send, you'll need to include the relevant headers.",
          items: {
            properties: {
              name: { description: 'The name of the header.', type: 'string' },
              value: { description: 'The value of the header.', type: 'string' },
            },
            type: 'object',
          },
          type: 'array',
        },
        signingKeyId: {
          description:
            'The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href="https://ably.com/documentation/general/events#security">webhook security docs</a> for more information.',
          type: 'string',
        },
        url: { type: 'string' },
      },
      required: ['url'],
      type: 'object',
    },
    version: {
      description:
        'API version. Events and the format of their payloads are versioned. Please see the <a href="https://ably.com/documentation/general/events">Events documentation</a>.',
      type: 'string',
    },
  },
  required: ['ruleType', 'requestMode', 'source', 'target'],
  type: 'object',
  title: 'zapier_rule_response',
  'x-readme-ref-name': 'zapier_rule_response',
} as const;
export {
  AmqpExternalRulePatch,
  AmqpExternalRulePost,
  AmqpExternalRuleResponse,
  AmqpRulePatch,
  AmqpRulePost,
  AmqpRuleResponse,
  AppPatch,
  AppPkcs12,
  AppPost,
  AppResponse,
  AwsAccessKeys,
  AwsAccessKeysResponse,
  AwsAssumeRole,
  AwsKinesisRulePatch,
  AwsKinesisRulePost,
  AwsKinesisRuleResponse,
  AwsLambdaRulePatch,
  AwsLambdaRulePost,
  AwsLambdaRuleResponse,
  AwsSqsRulePatch,
  AwsSqsRulePost,
  AwsSqsRuleResponse,
  AzureFunctionRulePatch,
  AzureFunctionRulePost,
  AzureFunctionRuleResponse,
  CloudflareWorkerRulePatch,
  CloudflareWorkerRulePost,
  CloudflareWorkerRuleResponse,
  DeleteAppsAppIdNamespacesNamespaceId,
  DeleteAppsAppIdQueuesQueueId,
  DeleteAppsAppIdRulesRuleId,
  DeleteAppsId,
  Error,
  GetAccountsAccountIdApps,
  GetAppsAppIdKeys,
  GetAppsAppIdNamespaces,
  GetAppsAppIdQueues,
  GetAppsAppIdRules,
  GetAppsAppIdRulesRuleId,
  GoogleCloudFunctionRulePatch,
  GoogleCloudFunctionRulePost,
  GoogleCloudFunctionRuleResponse,
  HttpRulePatch,
  HttpRulePost,
  HttpRuleResponse,
  IftttRulePatch,
  IftttRulePost,
  IftttRuleResponse,
  KeyPatch,
  KeyPost,
  KeyResponse,
  Me,
  NamespacePatch,
  NamespacePost,
  NamespaceResponse,
  PatchAppsAppIdKeysKeyId,
  PatchAppsAppIdNamespacesNamespaceId,
  PatchAppsAppIdRulesRuleId,
  PatchAppsId,
  PostAccountsAccountIdApps,
  PostAppsAppIdKeys,
  PostAppsAppIdKeysKeyIdRevoke,
  PostAppsAppIdNamespaces,
  PostAppsAppIdQueues,
  PostAppsAppIdRules,
  PostAppsIdPkcs12,
  Queue,
  QueueResponse,
  RuleAttributes,
  RulePatch,
  RulePost,
  RuleResponse,
  RuleSource,
  RuleSourcePatch,
  UnsupportedRuleResponse,
  ZapierRulePatch,
  ZapierRulePost,
  ZapierRuleResponse,
};
