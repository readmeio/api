import RuleSource from './RuleSource.js';

const GoogleCloudFunctionRulePost = {
  "additionalProperties": false,
  "properties": {
    "requestMode": {
      "description": "This is Single Request mode or Batch Request mode. Single Request mode sends each event separately to the endpoint specified by the rule. Batch Request mode rolls up multiple events into the same request. You can read more about the difference between single and batched events in the Ably <a href=\"https://ably.com/documentation/general/events#batching\">documentation</a>.",
      "enum": [
        "single",
        "batch"
      ],
      "type": "string",
      "examples": [
        "single"
      ]
    },
    "ruleType": {
      "description": "The type of rule. In this case Google Cloud Function. See the <a href=\"https://ably.com/integrations\">documentation</a> for further information.",
      "enum": [
        "http/google-cloud-function"
      ],
      "type": "string"
    },
    "source": RuleSource,
    "target": {
      "additionalProperties": false,
      "properties": {
        "enveloped": {
          "description": "Messages delivered through Reactor are wrapped in an Ably envelope by default that contains metadata about the message and its payload. The form of the envelope depends on whether it is part of a Webhook/Function or a Queue/Firehose rule. For everything besides Webhooks, you can ensure you only get the raw payload by unchecking \"Enveloped\" when setting up the rule.",
          "type": [
            "boolean",
            "null"
          ]
        },
        "format": {
          "description": "JSON provides a text-based encoding.",
          "enum": [
            "json"
          ],
          "type": "string"
        },
        "functionName": {
          "description": "The name of your Google Cloud Function.",
          "type": "string"
        },
        "headers": {
          "description": "If you have additional information to send, you'll need to include the relevant headers.",
          "items": {
            "properties": {
              "name": {
                "description": "The name of the header.",
                "type": "string"
              },
              "value": {
                "description": "The value of the header.",
                "type": "string"
              }
            },
            "type": "object"
          },
          "type": "array"
        },
        "projectId": {
          "description": "The project ID for your Google Cloud Project that was generated when you created your project.",
          "type": "string"
        },
        "region": {
          "description": "The region in which your Google Cloud Function is hosted. See the <a href=\"https://cloud.google.com/compute/docs/regions-zones/\">Google documentation</a> for more details.",
          "type": "string",
          "examples": [
            "us-west1"
          ]
        },
        "signingKeyId": {
          "description": "The signing key ID for use in `batch` mode. Ably will optionally sign the payload using an API key ensuring your servers can validate the payload using the private API key. See the <a href=\"https://ably.com/documentation/general/events#security\">webhook security docs</a> for more information.",
          "type": [
            "string",
            "null"
          ]
        }
      },
      "required": [
        "region",
        "projectId",
        "functionName"
      ],
      "type": "object"
    }
  },
  "required": [
    "ruleType",
    "requestMode",
    "source",
    "target"
  ],
  "type": "object",
  "title": "google_cloud_function_rule_post",
  "x-readme-ref-name": "google_cloud_function_rule_post"
} as const;
export default GoogleCloudFunctionRulePost
