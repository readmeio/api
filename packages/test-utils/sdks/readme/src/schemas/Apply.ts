const Apply = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Your full name",
      "default": "Your Name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "A valid email we can reach you at.",
      "default": "you@example.com"
    },
    "job": {
      "type": "string",
      "description": "The job you're looking to apply for (https://readme.com/careers)."
    },
    "pronouns": {
      "type": "string",
      "description": "Learn more at https://lgbtlifecenter.org/pronouns/"
    },
    "linkedin": {
      "type": "string",
      "format": "url",
      "description": "What have you been up to the past few years?"
    },
    "github": {
      "type": "string",
      "description": "Or Bitbucket, Gitlab or anywhere else your code is hosted!",
      "format": "url"
    },
    "coverLetter": {
      "type": "string",
      "format": "blob",
      "description": "What should we know about you?"
    },
    "dontReallyApply": {
      "type": "boolean",
      "description": "Want to play with the API but not actually apply? Set this to true.",
      "default": false
    }
  },
  "required": [
    "name",
    "email",
    "job"
  ],
  "title": "apply",
  "x-readme-ref-name": "apply"
} as const;
export default Apply
