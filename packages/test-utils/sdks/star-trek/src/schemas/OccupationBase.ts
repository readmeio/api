const OccupationBase = {
  "type": "object",
  "description": "Base occupations, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Occupation unique ID"
    },
    "name": {
      "type": "string",
      "description": "Occupation name"
    },
    "legalOccupation": {
      "type": "boolean",
      "description": "Whether it's a legal occupation"
    },
    "medicalOccupation": {
      "type": "boolean",
      "description": "Whether it's a medical occupation"
    },
    "scientificOccupation": {
      "type": "boolean",
      "description": "Whether it's a scientific occupation"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "OccupationBase",
  "x-readme-ref-name": "OccupationBase"
} as const;
export default OccupationBase
