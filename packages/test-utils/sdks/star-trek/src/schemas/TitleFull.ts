import CharacterBase from './CharacterBase';

const TitleFull = {
  "type": "object",
  "description": "Full title, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Title unique ID"
    },
    "name": {
      "type": "string",
      "description": "Title name"
    },
    "militaryRank": {
      "type": "boolean",
      "description": "Whether it's a military rank"
    },
    "fleetRank": {
      "type": "boolean",
      "description": "Whether it's a fleet rank"
    },
    "religiousTitle": {
      "type": "boolean",
      "description": "Whether it's a religious title"
    },
    "position": {
      "type": "boolean",
      "description": "Whether it's a position"
    },
    "mirror": {
      "type": "boolean",
      "description": "Whether this title is from mirror universe"
    },
    "characters": {
      "type": "array",
      "description": "Characters that holds this title",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TitleFull",
  "x-readme-ref-name": "TitleFull"
} as const;
export default TitleFull
