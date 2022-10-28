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
const CreateUsersWithArrayInput = {
  body: { type: 'array', items: User, $schema: 'http://json-schema.org/draft-04/schema#' },
} as const;
const CreateUsersWithListInput = {
  body: { type: 'array', items: User, $schema: 'http://json-schema.org/draft-04/schema#' },
} as const;
const DeleteOrder = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          orderId: {
            type: 'integer',
            format: 'int64',
            minimum: 1,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of the order that needs to be deleted',
          },
        },
        required: ['orderId'],
      },
    ],
  },
} as const;
const DeletePet = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          petId: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Pet id to delete',
          },
        },
        required: ['petId'],
      },
      {
        type: 'object',
        properties: {
          api_key: { type: 'string', $schema: 'http://json-schema.org/draft-04/schema#' },
        },
        required: [],
      },
    ],
  },
} as const;
const DeleteUser = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The name that needs to be deleted',
          },
        },
        required: ['username'],
      },
    ],
  },
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
const FindPetsByTags = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          tags: {
            type: 'array',
            items: { type: 'string' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Tags to filter by',
          },
        },
        required: ['tags'],
      },
    ],
  },
  response: {
    '200': { type: 'array', items: Pet, $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetInventory = {
  response: {
    '200': {
      type: 'object',
      additionalProperties: {
        type: 'integer',
        format: 'int32',
        minimum: -2147483648,
        maximum: 2147483647,
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetOrderById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          orderId: {
            type: 'integer',
            format: 'int64',
            minimum: 1,
            maximum: 10,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of pet that needs to be fetched',
          },
        },
        required: ['orderId'],
      },
    ],
  },
} as const;
const GetPetById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          petId: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of pet to return',
          },
        },
        required: ['petId'],
      },
    ],
  },
} as const;
const GetUserByName = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The name that needs to be fetched. Use user1 for testing. ',
          },
        },
        required: ['username'],
      },
    ],
  },
} as const;
const LoginUser = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The user name for login',
          },
          password: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The password for login in clear text',
          },
        },
        required: ['username', 'password'],
      },
    ],
  },
  response: { '200': { type: 'string', $schema: 'http://json-schema.org/draft-04/schema#' } },
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
const UpdatePetWithForm = {
  formData: {
    type: 'object',
    properties: {
      name: { description: 'Updated name of the pet', type: 'string' },
      status: { description: 'Updated status of the pet', type: 'string' },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          petId: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of pet that needs to be updated',
          },
        },
        required: ['petId'],
      },
    ],
  },
} as const;
const UpdateUser = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'name that need to be updated',
          },
        },
        required: ['username'],
      },
    ],
  },
} as const;
const UploadFile = {
  body: {
    type: 'object',
    properties: {
      additionalMetadata: { description: 'Additional data to pass to server', type: 'string' },
      file: { description: 'file to upload', type: 'string', format: 'binary' },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          petId: {
            type: 'integer',
            format: 'int64',
            minimum: -9223372036854776000,
            maximum: 9223372036854776000,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of pet to update',
          },
        },
        required: ['petId'],
      },
    ],
  },
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
export {
  ApiResponse,
  Category,
  CreateUsersWithArrayInput,
  CreateUsersWithListInput,
  DeleteOrder,
  DeletePet,
  DeleteUser,
  FindPetsByStatus,
  FindPetsByTags,
  GetInventory,
  GetOrderById,
  GetPetById,
  GetUserByName,
  LoginUser,
  Order,
  Pet,
  Tag,
  UpdatePetWithForm,
  UpdateUser,
  UploadFile,
  User,
};
