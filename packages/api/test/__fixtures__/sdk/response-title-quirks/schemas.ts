const GetAnything = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          status: {
            type: 'array',
            items: { type: 'string', enum: ['available', 'pending', 'sold'], default: 'available' },
            $schema: 'https://json-schema.org/draft/2020-12/schema#',
            description: 'Status values that need to be considered for filter',
          },
        },
        required: ['status'],
      },
    ],
  },
  response: {
    '2XX': {
      oneOf: [
        {
          title: '260 Created (token)',
          type: 'object',
          properties: {
            id: { type: 'string', examples: ['e450ec69-dac2-4858-b4c9-6d3af44bb5f8'] },
          },
        },
        {
          title: '260 Created',
          type: 'object',
          properties: {
            id: { type: 'string', examples: ['e450ec69-dac2-4858-b4c9-6d3af44bb5f8'] },
          },
        },
      ],
      $schema: 'https://json-schema.org/draft/2020-12/schema#',
    },
  },
} as const;
export { GetAnything };
