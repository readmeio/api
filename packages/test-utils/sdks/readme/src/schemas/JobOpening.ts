const JobOpening = {
  "type": "object",
  "properties": {
    "slug": {
      "type": "string",
      "description": "A slugified version of the job opening title.",
      "examples": [
        "api-engineer"
      ]
    },
    "title": {
      "type": "string",
      "description": "The job opening position.",
      "examples": [
        "API Engineer"
      ]
    },
    "description": {
      "type": "string",
      "description": "The description for this open position. This content is formatted as HTML."
    },
    "pullquote": {
      "type": "string",
      "description": "A short pullquote for the open position.",
      "examples": [
        "Deeply knowledgeable of the web, HTTP, and the API space."
      ]
    },
    "location": {
      "type": "string",
      "description": "Where this position is located at.",
      "examples": [
        "Remote"
      ]
    },
    "department": {
      "type": "string",
      "description": "The internal organization you'll be working in.",
      "examples": [
        "Engineering"
      ]
    },
    "url": {
      "type": "string",
      "format": "url",
      "description": "The place where you can apply for the position!"
    }
  },
  "title": "jobOpening",
  "x-readme-ref-name": "jobOpening"
} as const;
export default JobOpening
