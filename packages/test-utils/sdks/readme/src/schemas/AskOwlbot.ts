const AskOwlbot = {
  "body": {
    "type": "object",
    "required": [
      "question"
    ],
    "properties": {
      "question": {
        "type": "string",
        "description": "The question being asked to Owlbot."
      },
      "stream": {
        "type": "boolean",
        "description": "If true the response will be streamed as it is generated."
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "answer": {
          "type": "string"
        },
        "sources": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": {
                "type": "string",
                "description": "The page title for the given source."
              },
              "url": {
                "type": "string",
                "description": "A link to the source."
              }
            }
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default AskOwlbot
