const ErrorApikeyNotfound = {
  "title": "error_APIKEY_NOTFOUND",
  "x-readme-ref-name": "error_APIKEY_NOTFOUND",
  "type": "object",
  "properties": {
    "error": {
      "type": "string",
      "description": "An error code unique to the error received.",
      "default": "APIKEY_NOTFOUND"
    },
    "message": {
      "type": "string",
      "description": "The reason why the error occured."
    },
    "suggestion": {
      "type": "string",
      "description": "A helpful suggestion for how to alleviate the error."
    },
    "docs": {
      "type": "string",
      "format": "url",
      "description": "A [ReadMe Metrics](https://readme.com/metrics/) log URL where you can see more information the request that you made. If we have metrics URLs unavailable for your request, this URL will be a URL to our API Reference.",
      "examples": [
        "https://docs.readme.com/logs/6883d0ee-cf79-447a-826f-a48f7d5bdf5f"
      ]
    },
    "help": {
      "type": "string",
      "description": "Information on where you can receive additional assistance from our wonderful support team.",
      "examples": [
        "If you need help, email support@readme.io"
      ]
    },
    "poem": {
      "type": "array",
      "description": "A short poem we wrote you about your error.",
      "items": {
        "type": "string"
      },
      "examples": [
        "If you're seeing this error,",
        "Things didn't quite go the way we hoped.",
        "When we tried to process your request,",
        "Maybe trying again it'll work—who knows!"
      ]
    }
  }
} as const;
export default ErrorApikeyNotfound
