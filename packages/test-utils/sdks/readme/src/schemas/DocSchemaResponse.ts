const DocSchemaResponse = {
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Title of the page."
    },
    "type": {
      "type": "string",
      "description": "Type of the page. The available types all show up under the /docs/ URL path of your docs project (also known as the \"guides\" section). Can be \"basic\" (most common), \"error\" (page desribing an API error), or \"link\" (page that redirects to an external link).\n\n`basic` `error` `link`",
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
      "properties": {
        "code": {
          "type": "string",
          "description": "The error code for docs with the \"error\" type."
        }
      }
    }
  },
  "additionalProperties": true,
  "title": "docSchemaResponse",
  "x-readme-ref-name": "docSchemaResponse"
} as const;
export default DocSchemaResponse
