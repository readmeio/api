const DocSchemaPost = {
  "type": "object",
  "oneOf": [
    {
      "required": [
        "title",
        "category"
      ],
      "title": "`category` Parameter",
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
      "type": "object"
    },
    {
      "required": [
        "title",
        "categorySlug"
      ],
      "title": "`categorySlug` Parameter",
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
      "type": "object"
    }
  ],
  "additionalProperties": true,
  "title": "docSchemaPost",
  "x-readme-ref-name": "docSchemaPost"
} as const;
export default DocSchemaPost
