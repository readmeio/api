const CompanyHeader = {
  "type": "object",
  "description": "Header company, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Company unique ID"
    },
    "name": {
      "type": "string",
      "description": "Company title"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "CompanyHeader",
  "x-readme-ref-name": "CompanyHeader"
} as const;
export default CompanyHeader
