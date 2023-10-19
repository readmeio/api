const Platform = {
  "type": "object",
  "description": "Platform of video games",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Platform unique ID"
    },
    "name": {
      "type": "string",
      "description": "Platform name"
    }
  },
  "title": "Platform",
  "x-readme-ref-name": "Platform"
} as const;
export default Platform
