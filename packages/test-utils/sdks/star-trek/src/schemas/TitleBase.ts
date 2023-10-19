const TitleBase = {
  "type": "object",
  "description": "Base title, returned in search results",
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
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TitleBase",
  "x-readme-ref-name": "TitleBase"
} as const;
export default TitleBase
