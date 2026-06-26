import ErrorApikeyEmpty from './ErrorApikeyEmpty.js';
import ErrorApikeyMismatch from './ErrorApikeyMismatch.js';
import ErrorApikeyNotfound from './ErrorApikeyNotfound.js';

const UpdateDoc = {
  "body": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Title of the page."
      },
      "type": {
        "type": "string",
        "description": "Type of the page. This can be one of the following:\n- `basic` (most common)\n- `link` (page that redirects to an external link)\n- `error` (page describing an API error) [DEPRECATED]",
        "enum": [
          "basic",
          "error",
          "link"
        ]
      },
      "body": {
        "type": "string",
        "description": "Body content of the page, formatted in [ReadMe-flavored Markdown](https://docs.readme.com/rdmd/docs)."
      },
      "category": {
        "type": "string",
        "description": "Category ID of the page, which you can get through [the **Get all categories** endpoint](https://docs.readme.com/main/reference/getcategories)."
      },
      "hidden": {
        "type": "boolean",
        "description": "Visibility of the page."
      },
      "order": {
        "type": "integer",
        "description": "The position of the page in your project sidebar.",
        "examples": [
          999
        ]
      },
      "parentDoc": {
        "type": "string",
        "description": "The parent doc's ID, if the page is a subpage."
      },
      "error": {
        "type": "object",
        "deprecated": true,
        "description": "This is used for docs with the `type` set to `error`. The `error` page type and this `error` object have been deprecated.",
        "properties": {
          "code": {
            "type": "string",
            "description": "The error code for docs with the `error` type [DEPRECATED]."
          }
        }
      },
      "categorySlug": {
        "type": "string",
        "description": "The slug of the category this page is associated with. You can get this through [the **Get all categories** endpoint](https://docs.readme.com/main/reference/getcategories). This field is an alternative to the `category` field."
      },
      "parentDocSlug": {
        "type": "string",
        "description": "If this page is a subpage, this field will be the slug of the parent document. You can get this through https://docs.readme.com/main/reference/docs#getdoc. This field is an alternative to the `parentDoc` field."
      }
    },
    "additionalProperties": true,
    "title": "docSchemaPut",
    "x-readme-ref-name": "docSchemaPut",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "slug": {
            "type": "string",
            "description": "A URL-safe representation of the page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the title \"Getting Started\", enter the slug \"getting-started\"."
          }
        },
        "required": [
          "slug"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "x-readme-version": {
            "type": "string",
            "examples": [
              "v3.0"
            ],
            "description": "Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/main/reference/version#getversions."
          }
        }
      }
    ]
  },
  "response": {
    "401": {
      "oneOf": [
        ErrorApikeyEmpty,
        ErrorApikeyNotfound
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    },
    "403": {
      "oneOf": [
        ErrorApikeyMismatch
      ],
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default UpdateDoc
