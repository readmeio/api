const Country = {
  "type": "object",
  "description": "Real-world country",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Country unique ID"
    },
    "name": {
      "type": "string",
      "description": "Country name"
    },
    "iso31661Alpha2Code": {
      "type": "string",
      "description": "ISO 3166-1 alpha-2 code"
    }
  },
  "title": "Country",
  "x-readme-ref-name": "Country"
} as const;
export default Country
