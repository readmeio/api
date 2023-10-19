import CharacterBase from './CharacterBase';

const OccupationFull = {
  "type": "object",
  "description": "Full occupation, returned when queried using UID",
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
    },
    "characters": {
      "type": "array",
      "description": "Characters with this occupation",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "OccupationFull",
  "x-readme-ref-name": "OccupationFull"
} as const;
export default OccupationFull
