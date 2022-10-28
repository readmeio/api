declare const ApiResponse: {
  readonly type: 'object';
  readonly properties: {
    readonly code: {
      readonly type: 'integer';
      readonly format: 'int32';
      readonly minimum: -2147483648;
      readonly maximum: 2147483647;
    };
    readonly type: {
      readonly type: 'string';
    };
    readonly message: {
      readonly type: 'string';
    };
  };
  readonly title: 'ApiResponse';
  readonly 'x-readme-ref-name': 'ApiResponse';
};
declare const Category: {
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
declare const FindPetsByStatus: {
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
            readonly description: 'pet status in the store';
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
declare const Order: {
  readonly type: 'object';
  readonly properties: {
    readonly id: {
      readonly type: 'integer';
      readonly format: 'int64';
      readonly minimum: -9223372036854776000;
      readonly maximum: 9223372036854776000;
    };
    readonly petId: {
      readonly type: 'integer';
      readonly format: 'int64';
      readonly minimum: -9223372036854776000;
      readonly maximum: 9223372036854776000;
    };
    readonly quantity: {
      readonly type: 'integer';
      readonly format: 'int32';
      readonly minimum: -2147483648;
      readonly maximum: 2147483647;
    };
    readonly shipDate: {
      readonly type: 'string';
      readonly format: 'date-time';
    };
    readonly status: {
      readonly type: 'string';
      readonly description: 'Order Status';
      readonly enum: readonly ['placed', 'approved', 'delivered'];
    };
    readonly complete: {
      readonly type: 'boolean';
      readonly default: false;
    };
  };
  readonly title: 'Order';
  readonly 'x-readme-ref-name': 'Order';
};
declare const Pet: {
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
      readonly description: 'pet status in the store';
      readonly enum: readonly ['available', 'pending', 'sold'];
    };
  };
  readonly title: 'Pet';
  readonly 'x-readme-ref-name': 'Pet';
};
declare const Tag: {
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
declare const User: {
  readonly type: 'object';
  readonly properties: {
    readonly id: {
      readonly type: 'integer';
      readonly format: 'int64';
      readonly minimum: -9223372036854776000;
      readonly maximum: 9223372036854776000;
    };
    readonly username: {
      readonly type: 'string';
    };
    readonly firstName: {
      readonly type: 'string';
    };
    readonly lastName: {
      readonly type: 'string';
    };
    readonly email: {
      readonly type: 'string';
    };
    readonly password: {
      readonly type: 'string';
    };
    readonly phone: {
      readonly type: 'string';
    };
    readonly userStatus: {
      readonly type: 'integer';
      readonly format: 'int32';
      readonly description: 'User Status';
      readonly minimum: -2147483648;
      readonly maximum: 2147483647;
    };
  };
  readonly title: 'User';
  readonly 'x-readme-ref-name': 'User';
};
export { ApiResponse, Category, FindPetsByStatus, Order, Pet, Tag, User };
