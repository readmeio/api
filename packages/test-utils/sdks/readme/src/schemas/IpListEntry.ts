const IpListEntry = {
  "type": "object",
  "properties": {
    "ipAddress": {
      "type": "string",
      "description": "The IP address.",
      "examples": [
        "127.0.0.1"
      ]
    }
  },
  "title": "ipListEntry",
  "x-readme-ref-name": "ipListEntry"
} as const;
export default IpListEntry
