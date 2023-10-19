const CondensedProjectData = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "subdomain": {
      "type": "string"
    },
    "jwtSecret": {
      "type": "string"
    },
    "baseUrl": {
      "type": "string",
      "format": "url",
      "description": "The base URL for the project. If the project is not running under a custom domain, it will be `https://projectSubdomain.readme.io`, otherwise it can either be or `https://example.com` or, in the case of an enterprise child project `https://example.com/projectSubdomain`."
    },
    "plan": {
      "type": "string"
    }
  },
  "title": "condensedProjectData",
  "x-readme-ref-name": "condensedProjectData"
} as const;
export default CondensedProjectData
