const ApiResponse = {
  type: 'object',
  properties: {
    code: { type: 'integer', format: 'int32', minimum: -2147483648, maximum: 2147483647 },
    type: { type: 'string' },
    message: { type: 'string' },
  },
  title: 'ApiResponse',
  'x-readme-ref-name': 'ApiResponse',
} as const;
const Category = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    name: { type: 'string' },
  },
  title: 'Category',
  'x-readme-ref-name': 'Category',
} as const;
const FindPetsByStatus = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          status: {
            type: 'array',
            items: { type: 'string', enum: ['available', 'pending', 'sold'], default: 'available' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Status values that need to be considered for filter',
          },
        },
        required: ['status'],
      },
    ],
  },
  response: {
    '200': { type: 'array', items: Pet, $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const Order = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    petId: {
      type: 'integer',
      format: 'int64',
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    quantity: { type: 'integer', format: 'int32', minimum: -2147483648, maximum: 2147483647 },
    shipDate: { type: 'string', format: 'date-time' },
    status: {
      type: 'string',
      description: 'Order Status',
      enum: ['placed', 'approved', 'delivered'],
    },
    complete: { type: 'boolean', default: false },
  },
  title: 'Order',
  'x-readme-ref-name': 'Order',
} as const;
const Pet = {
  type: 'object',
  required: ['name', 'photoUrls'],
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      readOnly: true,
      default: 40,
      examples: [25],
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    category: Category,
    name: { type: 'string', examples: ['doggie'] },
    photoUrls: {
      type: 'array',
      items: { type: 'string', examples: ['https://example.com/photo.png'] },
    },
    tags: { type: 'array', items: Tag },
    status: {
      type: 'string',
      description: 'pet status in the store',
      enum: ['available', 'pending', 'sold'],
    },
  },
  title: 'Pet',
  'x-readme-ref-name': 'Pet',
} as const;
const Tag = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    name: { type: 'string' },
  },
  title: 'Tag',
  'x-readme-ref-name': 'Tag',
} as const;
const User = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      format: 'int64',
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    username: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    userStatus: {
      type: 'integer',
      format: 'int32',
      description: 'User Status',
      minimum: -2147483648,
      maximum: 2147483647,
    },
  },
  title: 'User',
  'x-readme-ref-name': 'User',
} as const;
export { ApiResponse, Category, FindPetsByStatus, Order, Pet, Tag, User };
