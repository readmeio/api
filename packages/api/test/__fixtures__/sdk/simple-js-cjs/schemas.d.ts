declare const findPetsByStatus: {
  readonly metadata: {
    readonly allOf: readonly [
      {
        readonly type: 'object';
        readonly properties: {
          readonly status: {
            readonly type: 'array';
            readonly items: {
              readonly type: 'string';
              readonly enum: readonly ['available', 'pending', 'sold'];
              readonly default: 'available';
            };
            readonly $schema: 'http://json-schema.org/draft-04/schema#';
            readonly description: 'Status values that need to be considered for filter';
          };
        };
        readonly required: readonly ['status'];
      }
    ];
  };
  readonly response: {
    readonly '200': {
      readonly type: 'array';
      readonly items: {
        readonly type: 'object';
        readonly required: readonly ['name', 'photoUrls'];
        readonly properties: {
          readonly id: {
            readonly type: 'integer';
            readonly format: 'int64';
            readonly readOnly: true;
            readonly default: 40;
            readonly examples: readonly [25];
            readonly minimum: -9223372036854776000;
            readonly maximum: 9223372036854776000;
          };
          readonly category: {
            readonly type: 'object';
            readonly properties: {
              readonly id: {
                readonly type: 'integer';
                readonly format: 'int64';
                readonly minimum: -9223372036854776000;
                readonly maximum: 9223372036854776000;
              };
              readonly name: {
                readonly type: 'string';
              };
            };
            readonly title: 'Category';
            readonly 'x-readme-ref-name': 'Category';
          };
          readonly name: {
            readonly type: 'string';
            readonly examples: readonly ['doggie'];
          };
          readonly photoUrls: {
            readonly type: 'array';
            readonly items: {
              readonly type: 'string';
              readonly examples: readonly ['https://example.com/photo.png'];
            };
          };
          readonly tags: {
            readonly type: 'array';
            readonly items: {
              readonly type: 'object';
              readonly properties: {
                readonly id: {
                  readonly type: 'integer';
                  readonly format: 'int64';
                  readonly minimum: -9223372036854776000;
                  readonly maximum: 9223372036854776000;
                };
                readonly name: {
                  readonly type: 'string';
                };
              };
              readonly title: 'Tag';
              readonly 'x-readme-ref-name': 'Tag';
            };
          };
          readonly status: {
            readonly type: 'string';
            readonly description: 'pet status in the store\n\n`available` `pending` `sold`';
            readonly enum: readonly ['available', 'pending', 'sold'];
          };
        };
        readonly title: 'Pet';
        readonly 'x-readme-ref-name': 'Pet';
      };
      readonly $schema: 'http://json-schema.org/draft-04/schema#';
    };
  };
};
export { findPetsByStatus };
