const ConflictBase = {
  "type": "object",
  "description": "Base conflict, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Conflict unique ID"
    },
    "name": {
      "type": "string",
      "description": "Conflict name"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of the conflict"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of the conflict"
    },
    "earthConflict": {
      "type": "boolean",
      "description": "Whether it was an Earth conflict"
    },
    "federationWar": {
      "type": "boolean",
      "description": "Whether this conflict is part of war involving Federation"
    },
    "klingonWar": {
      "type": "boolean",
      "description": "Whether this conflict is part of war involving the Klingons"
    },
    "dominionWarBattle": {
      "type": "boolean",
      "description": "Whether this conflict is a Dominion war battle"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this conflict is from alternate reality"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "ConflictBase",
  "x-readme-ref-name": "ConflictBase"
} as const;
export default ConflictBase
