const Apply = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, description: 'Your full name', default: 'Your Name' },
    email: {
      type: 'string',
      format: 'email',
      description: 'A valid email we can reach you at.',
      default: 'you@example.com',
    },
    job: {
      type: 'string',
      description: "The job you're looking to apply for (https://readme.com/careers).",
    },
    pronouns: { type: 'string', description: 'Learn more at https://pronoun.is/' },
    linkedin: {
      type: 'string',
      format: 'url',
      description: 'What have you been up to the past few years?',
    },
    github: {
      type: 'string',
      description: 'Or Bitbucket, Gitlab or anywhere else your code is hosted!',
      format: 'url',
    },
    coverLetter: { type: 'string', format: 'blob', description: 'What should we know about you?' },
    dontReallyApply: {
      type: 'boolean',
      description: 'Want to play with the API but not actually apply? Set this to true.',
      default: false,
    },
  },
  required: ['name', 'email', 'job'],
  title: 'apply',
  'x-readme-ref-name': 'apply',
} as const;
const BaseError = {
  type: 'object',
  properties: {
    error: { type: 'string', description: 'An error code unique to the error received.' },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
  title: 'baseError',
  'x-readme-ref-name': 'baseError',
} as const;
const Category = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'A short title for the category. This is what will show in the sidebar.',
    },
    type: {
      type: 'string',
      enum: ['reference', 'guide'],
      default: 'guide',
      description:
        'A category can be part of your reference or guide documentation, which is determined by this field.',
    },
  },
  title: 'category',
  'x-readme-ref-name': 'category',
} as const;
const Changelog = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Title of the changelog.' },
    type: { type: 'string', enum: ['', 'added', 'fixed', 'improved', 'deprecated', 'removed'] },
    body: { type: 'string', description: 'Body content of the changelog.' },
    hidden: { type: 'boolean', description: 'Visibility of the changelog.', default: true },
  },
  required: ['title', 'body'],
  title: 'changelog',
  'x-readme-ref-name': 'changelog',
} as const;
const CondensedProjectData = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    subdomain: { type: 'string' },
    jwtSecret: { type: 'string' },
    baseUrl: {
      type: 'string',
      format: 'url',
      description:
        'The base URL for the project. If the project is not running under a custom domain, it will be `https://projectSubdomain.readme.io`, otherwise it can either be or `https://example.com` or, in the case of an enterprise child project `https://example.com/projectSubdomain`.',
    },
    plan: { type: 'string' },
  },
  title: 'condensedProjectData',
  'x-readme-ref-name': 'condensedProjectData',
} as const;
const CreateCategory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
} as const;
const CreateCustomPage = {
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const CreateDoc = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const CreateVersion = {
  response: {
    '400': {
      oneOf: [ErrorVersionEmpty, ErrorVersionDuplicate, ErrorVersionForkEmpty],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const CustomPage = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Title of the custom page.' },
    body: { type: 'string', description: 'Body formatted in Markdown (displayed by default).' },
    html: {
      type: 'string',
      description: 'Body formatted in HTML (sanitized, only displayed if `htmlmode` is **true**).',
    },
    htmlmode: {
      type: 'boolean',
      description:
        '**true** if `html` should be displayed, **false** if `body` should be displayed.',
      default: false,
    },
    hidden: { type: 'boolean', description: 'Visibility of the custom page.', default: true },
  },
  required: ['title'],
  title: 'customPage',
  'x-readme-ref-name': 'customPage',
} as const;
const DeleteApiSpecification = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const DeleteCategory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['getting-started'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
} as const;
const DeleteChangelog = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update".',
          },
        },
        required: ['slug'],
      },
    ],
  },
} as const;
const DeleteCustomPage = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const DeleteDoc = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['new-features'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const DeleteVersion = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          versionId: {
            type: 'string',
            examples: ['v1.0.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).',
          },
        },
        required: ['versionId'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const Doc = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Title of the page.' },
    type: {
      type: 'string',
      description:
        'Type of the page. The available types all show up under the /docs/ URL path of your docs project (also known as the "guides" section). Can be "basic" (most common), "error" (page desribing an API error), or "link" (page that redirects to an external link).',
      enum: ['basic', 'error', 'link'],
    },
    body: {
      type: 'string',
      description:
        'Body content of the page, formatted in ReadMe or GitHub flavored Markdown. Accepts long page content, for example, greater than 100k characters.',
    },
    category: {
      type: 'string',
      description:
        'Category ID of the page, which you can get through https://docs.readme.com/reference/categories#getcategory.',
    },
    hidden: { type: 'boolean', description: 'Visibility of the page.', default: true },
    order: {
      type: 'integer',
      description: 'The position of the page in your project sidebar.',
      default: 999,
    },
    parentDoc: {
      type: 'string',
      description:
        'For a subpage, specify the parent doc ID, which you can get through https://docs.readme.com/reference/docs#getdoc.',
    },
    error: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'The error code for docs with the "error" type.' },
      },
    },
  },
  required: ['title', 'category'],
  title: 'doc',
  'x-readme-ref-name': 'doc',
} as const;
const ErrorApikeyEmpty = {
  title: 'error_APIKEY_EMPTY',
  'x-readme-ref-name': 'error_APIKEY_EMPTY',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'APIKEY_EMPTY',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorApikeyMismatch = {
  title: 'error_APIKEY_MISMATCH',
  'x-readme-ref-name': 'error_APIKEY_MISMATCH',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'APIKEY_MISMATCH',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorApikeyNotfound = {
  title: 'error_APIKEY_NOTFOUND',
  'x-readme-ref-name': 'error_APIKEY_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'APIKEY_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorApplyInvalidEmail = {
  title: 'error_APPLY_INVALID_EMAIL',
  'x-readme-ref-name': 'error_APPLY_INVALID_EMAIL',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'APPLY_INVALID_EMAIL',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorApplyInvalidJob = {
  title: 'error_APPLY_INVALID_JOB',
  'x-readme-ref-name': 'error_APPLY_INVALID_JOB',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'APPLY_INVALID_JOB',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorApplyInvalidName = {
  title: 'error_APPLY_INVALID_NAME',
  'x-readme-ref-name': 'error_APPLY_INVALID_NAME',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'APPLY_INVALID_NAME',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorCategoryInvalid = {
  title: 'error_CATEGORY_INVALID',
  'x-readme-ref-name': 'error_CATEGORY_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'CATEGORY_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorCategoryNotfound = {
  title: 'error_CATEGORY_NOTFOUND',
  'x-readme-ref-name': 'error_CATEGORY_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'CATEGORY_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorChangelogInvalid = {
  title: 'error_CHANGELOG_INVALID',
  'x-readme-ref-name': 'error_CHANGELOG_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'CHANGELOG_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorChangelogNotfound = {
  title: 'error_CHANGELOG_NOTFOUND',
  'x-readme-ref-name': 'error_CHANGELOG_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'CHANGELOG_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorCustompageInvalid = {
  title: 'error_CUSTOMPAGE_INVALID',
  'x-readme-ref-name': 'error_CUSTOMPAGE_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'CUSTOMPAGE_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorCustompageNotfound = {
  title: 'error_CUSTOMPAGE_NOTFOUND',
  'x-readme-ref-name': 'error_CUSTOMPAGE_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'CUSTOMPAGE_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorDocInvalid = {
  title: 'error_DOC_INVALID',
  'x-readme-ref-name': 'error_DOC_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'DOC_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorDocNotfound = {
  title: 'error_DOC_NOTFOUND',
  'x-readme-ref-name': 'error_DOC_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'DOC_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorEndpointNotfound = {
  title: 'error_ENDPOINT_NOTFOUND',
  'x-readme-ref-name': 'error_ENDPOINT_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'ENDPOINT_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorInternalError = {
  title: 'error_INTERNAL_ERROR',
  'x-readme-ref-name': 'error_INTERNAL_ERROR',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'INTERNAL_ERROR',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorProjectNeedsstaging = {
  title: 'error_PROJECT_NEEDSSTAGING',
  'x-readme-ref-name': 'error_PROJECT_NEEDSSTAGING',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'PROJECT_NEEDSSTAGING',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorProjectNotfound = {
  title: 'error_PROJECT_NOTFOUND',
  'x-readme-ref-name': 'error_PROJECT_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'PROJECT_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorRegistryInvalid = {
  title: 'error_REGISTRY_INVALID',
  'x-readme-ref-name': 'error_REGISTRY_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'REGISTRY_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorRegistryNotfound = {
  title: 'error_REGISTRY_NOTFOUND',
  'x-readme-ref-name': 'error_REGISTRY_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'REGISTRY_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecFileEmpty = {
  title: 'error_SPEC_FILE_EMPTY',
  'x-readme-ref-name': 'error_SPEC_FILE_EMPTY',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_FILE_EMPTY',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecIdDuplicate = {
  title: 'error_SPEC_ID_DUPLICATE',
  'x-readme-ref-name': 'error_SPEC_ID_DUPLICATE',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_ID_DUPLICATE',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecIdInvalid = {
  title: 'error_SPEC_ID_INVALID',
  'x-readme-ref-name': 'error_SPEC_ID_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_ID_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecInvalid = {
  title: 'error_SPEC_INVALID',
  'x-readme-ref-name': 'error_SPEC_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecInvalidSchema = {
  title: 'error_SPEC_INVALID_SCHEMA',
  'x-readme-ref-name': 'error_SPEC_INVALID_SCHEMA',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_INVALID_SCHEMA',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecNotfound = {
  title: 'error_SPEC_NOTFOUND',
  'x-readme-ref-name': 'error_SPEC_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecTimeout = {
  title: 'error_SPEC_TIMEOUT',
  'x-readme-ref-name': 'error_SPEC_TIMEOUT',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_TIMEOUT',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorSpecVersionNotfound = {
  title: 'error_SPEC_VERSION_NOTFOUND',
  'x-readme-ref-name': 'error_SPEC_VERSION_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'SPEC_VERSION_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorUnexpectedError = {
  title: 'error_UNEXPECTED_ERROR',
  'x-readme-ref-name': 'error_UNEXPECTED_ERROR',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'UNEXPECTED_ERROR',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionCantDemoteStable = {
  title: 'error_VERSION_CANT_DEMOTE_STABLE',
  'x-readme-ref-name': 'error_VERSION_CANT_DEMOTE_STABLE',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_CANT_DEMOTE_STABLE',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionCantRemoveStable = {
  title: 'error_VERSION_CANT_REMOVE_STABLE',
  'x-readme-ref-name': 'error_VERSION_CANT_REMOVE_STABLE',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_CANT_REMOVE_STABLE',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionDuplicate = {
  title: 'error_VERSION_DUPLICATE',
  'x-readme-ref-name': 'error_VERSION_DUPLICATE',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_DUPLICATE',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionEmpty = {
  title: 'error_VERSION_EMPTY',
  'x-readme-ref-name': 'error_VERSION_EMPTY',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_EMPTY',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionForkEmpty = {
  title: 'error_VERSION_FORK_EMPTY',
  'x-readme-ref-name': 'error_VERSION_FORK_EMPTY',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_FORK_EMPTY',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionForkNotfound = {
  title: 'error_VERSION_FORK_NOTFOUND',
  'x-readme-ref-name': 'error_VERSION_FORK_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_FORK_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionInvalid = {
  title: 'error_VERSION_INVALID',
  'x-readme-ref-name': 'error_VERSION_INVALID',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_INVALID',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const ErrorVersionNotfound = {
  title: 'error_VERSION_NOTFOUND',
  'x-readme-ref-name': 'error_VERSION_NOTFOUND',
  type: 'object',
  properties: {
    error: {
      type: 'string',
      description: 'An error code unique to the error received.',
      default: 'VERSION_NOTFOUND',
    },
    message: { type: 'string', description: 'The reason why the error occured.' },
    suggestion: {
      type: 'string',
      description: 'A helpful suggestion for how to alleviate the error.',
    },
    docs: {
      type: 'string',
      format: 'url',
      description:
        'A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.',
      examples: ['https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f'],
    },
    help: {
      type: 'string',
      description:
        'Information on where you can receive additional assistance from our wonderful support team.',
      examples: ['If you need help, email support@readme.io'],
    },
    poem: {
      type: 'array',
      description: 'A short poem we wrote you about your error.',
      items: { type: 'string' },
      examples: [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        'When we tried to process your request,',
        "Maybe trying again it'll work—who knows!",
      ],
    },
  },
} as const;
const GetApiRegistry = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          uuid: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'An API Registry UUID. This can be found by navigating to your API Reference page and viewing code snippets for Node with the `api` library.',
          },
        },
        required: ['uuid'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: true,
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetApiSpecification = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          perPage: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of items to include in pagination (up to 100, defaults to 10).',
          },
          page: {
            type: 'integer',
            default: 1,
            minimum: 1,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Used to specify further pages (starts at 1).',
          },
        },
        required: [],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        Link: {
          type: 'string',
          description:
            'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
        },
        'x-total-count': {
          type: 'string',
          description:
            'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
        },
      },
    },
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetCategories = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          perPage: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of items to include in pagination (up to 100, defaults to 10).',
          },
          page: {
            type: 'integer',
            default: 1,
            minimum: 1,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Used to specify further pages (starts at 1).',
          },
        },
        required: [],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        Link: {
          type: 'string',
          description:
            'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
        },
        'x-total-count': {
          type: 'string',
          description:
            'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
        },
      },
    },
  },
} as const;
const GetCategory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['getting-started'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
} as const;
const GetCategoryDocs = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['getting-started'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
} as const;
const GetChangelog = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update".',
          },
        },
        required: ['slug'],
      },
    ],
  },
} as const;
const GetChangelogs = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          perPage: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of items to include in pagination (up to 100, defaults to 10).',
          },
          page: {
            type: 'integer',
            default: 1,
            minimum: 1,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Used to specify further pages (starts at 1).',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        Link: {
          type: 'string',
          description:
            'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
        },
        'x-total-count': {
          type: 'string',
          description:
            'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
        },
      },
    },
  },
} as const;
const GetCustomPage = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetCustomPages = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          perPage: {
            type: 'integer',
            default: 10,
            minimum: 1,
            maximum: 100,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of items to include in pagination (up to 100, defaults to 10).',
          },
          page: {
            type: 'integer',
            default: 1,
            minimum: 1,
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Used to specify further pages (starts at 1).',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        Link: {
          type: 'string',
          description:
            'Pagination information. See https://docs.readme.com/reference/pagination for more information.',
        },
        'x-total-count': {
          type: 'string',
          description:
            'The total amount of results, ignoring pagination. See https://docs.readme.com/reference/pagination for more information about pagination.',
        },
      },
    },
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetDoc = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['new-features'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetErrors = {
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetOpenRoles = {
  response: {
    '200': { type: 'array', items: JobOpening, $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetProductionDoc = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['new-features'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetProject = {
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetVersion = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          versionId: {
            type: 'string',
            examples: ['v1.0.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).',
          },
        },
        required: ['versionId'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const GetVersions = {
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const JobOpening = {
  type: 'object',
  properties: {
    slug: {
      type: 'string',
      description: 'A slugified version of the job opening title.',
      examples: ['api-engineer'],
    },
    title: { type: 'string', description: 'The job opening position.', examples: ['API Engineer'] },
    description: {
      type: 'string',
      description: 'The description for this open position. This content is formatted as HTML.',
    },
    pullquote: {
      type: 'string',
      description: 'A short pullquote for the open position.',
      examples: ['Deeply knowledgeable of the web, HTTP, and the API space.'],
    },
    location: {
      type: 'string',
      description: 'Where this position is located at.',
      examples: ['Remote'],
    },
    department: {
      type: 'string',
      description: "The internal organization you'll be working in.",
      examples: ['Engineering'],
    },
    url: {
      type: 'string',
      format: 'url',
      description: 'The place where you can apply for the position!',
    },
  },
  title: 'jobOpening',
  'x-readme-ref-name': 'jobOpening',
} as const;
const SearchDocs = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Search string to look for.',
          },
        },
        required: ['search'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const UpdateApiSpecification = {
  body: {
    type: 'object',
    properties: {
      spec: {
        description: 'OpenAPI/Swagger file. We accept JSON or YAML.',
        type: 'string',
        format: 'binary',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'ID of the API specification. The unique ID for each API can be found by navigating to your **API Definitions** page.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '400': {
      oneOf: [
        ErrorSpecFileEmpty,
        ErrorSpecIdDuplicate,
        ErrorSpecIdInvalid,
        ErrorSpecInvalid,
        ErrorSpecInvalidSchema,
        ErrorSpecVersionNotfound,
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const UpdateCategory = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['getting-started'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the category title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the category "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
} as const;
const UpdateChangelog = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the changelog title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the changelog "Owlet Weekly Update", enter the slug "owlet-weekly-update".',
          },
        },
        required: ['slug'],
      },
    ],
  },
} as const;
const UpdateCustomPage = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the custom page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the custom page "Getting Started", enter the slug "getting-started".',
          },
        },
        required: ['slug'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const UpdateDoc = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            examples: ['new-features'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A URL-safe representation of the doc title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the the doc "New Features", enter the slug "new-features".',
          },
        },
        required: ['slug'],
      },
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const UpdateVersion = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          versionId: {
            type: 'string',
            examples: ['v1.0.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions).',
          },
        },
        required: ['versionId'],
      },
    ],
  },
  response: {
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const UploadApiSpecification = {
  body: {
    type: 'object',
    properties: {
      spec: {
        description: 'OpenAPI/Swagger file. We accept JSON or YAML.',
        type: 'string',
        format: 'binary',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'x-readme-version': {
            type: 'string',
            examples: ['v3.0'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/reference/version#getversions.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '400': {
      oneOf: [
        ErrorSpecFileEmpty,
        ErrorSpecInvalid,
        ErrorSpecInvalidSchema,
        ErrorSpecVersionNotfound,
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      oneOf: [ErrorApikeyEmpty, ErrorApikeyNotfound],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': { oneOf: [ErrorApikeyMismatch], $schema: 'http://json-schema.org/draft-04/schema#' },
  },
} as const;
const Version = {
  type: 'object',
  properties: {
    version: { type: 'string', description: 'Semantic Version' },
    codename: { type: 'string', description: 'Dubbed name of version.' },
    from: { type: 'string', description: 'Semantic Version to use as the base fork.' },
    is_stable: { type: 'boolean', description: 'Should this be the **main** version?' },
    is_beta: { type: 'boolean', default: true },
    is_hidden: { type: 'boolean', description: 'Should this be publically accessible?' },
    is_deprecated: {
      type: 'boolean',
      description: 'Should this be deprecated? Only allowed in PUT operations.',
    },
  },
  required: ['version', 'from'],
  title: 'version',
  'x-readme-ref-name': 'version',
} as const;
export {
  Apply,
  BaseError,
  Category,
  Changelog,
  CondensedProjectData,
  CreateCategory,
  CreateCustomPage,
  CreateDoc,
  CreateVersion,
  CustomPage,
  DeleteApiSpecification,
  DeleteCategory,
  DeleteChangelog,
  DeleteCustomPage,
  DeleteDoc,
  DeleteVersion,
  Doc,
  ErrorApikeyEmpty,
  ErrorApikeyMismatch,
  ErrorApikeyNotfound,
  ErrorApplyInvalidEmail,
  ErrorApplyInvalidJob,
  ErrorApplyInvalidName,
  ErrorCategoryInvalid,
  ErrorCategoryNotfound,
  ErrorChangelogInvalid,
  ErrorChangelogNotfound,
  ErrorCustompageInvalid,
  ErrorCustompageNotfound,
  ErrorDocInvalid,
  ErrorDocNotfound,
  ErrorEndpointNotfound,
  ErrorInternalError,
  ErrorProjectNeedsstaging,
  ErrorProjectNotfound,
  ErrorRegistryInvalid,
  ErrorRegistryNotfound,
  ErrorSpecFileEmpty,
  ErrorSpecIdDuplicate,
  ErrorSpecIdInvalid,
  ErrorSpecInvalid,
  ErrorSpecInvalidSchema,
  ErrorSpecNotfound,
  ErrorSpecTimeout,
  ErrorSpecVersionNotfound,
  ErrorUnexpectedError,
  ErrorVersionCantDemoteStable,
  ErrorVersionCantRemoveStable,
  ErrorVersionDuplicate,
  ErrorVersionEmpty,
  ErrorVersionForkEmpty,
  ErrorVersionForkNotfound,
  ErrorVersionInvalid,
  ErrorVersionNotfound,
  GetApiRegistry,
  GetApiSpecification,
  GetCategories,
  GetCategory,
  GetCategoryDocs,
  GetChangelog,
  GetChangelogs,
  GetCustomPage,
  GetCustomPages,
  GetDoc,
  GetErrors,
  GetOpenRoles,
  GetProductionDoc,
  GetProject,
  GetVersion,
  GetVersions,
  JobOpening,
  SearchDocs,
  UpdateApiSpecification,
  UpdateCategory,
  UpdateChangelog,
  UpdateCustomPage,
  UpdateDoc,
  UpdateVersion,
  UploadApiSpecification,
  Version,
};
