import CharacterBase from './CharacterBase.js';
import LocationBase from './LocationBase.js';
import OrganizationBase from './OrganizationBase.js';

const ConflictFull = {
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
      "description": "Whether it is an Earth conflict"
    },
    "federationWar": {
      "type": "boolean",
      "description": "Whether this conflict is a part of war involving Federation"
    },
    "klingonWar": {
      "type": "boolean",
      "description": "Whether this conflict is a part of war involving the Klingons"
    },
    "dominionWarBattle": {
      "type": "boolean",
      "description": "Whether this conflict is a Dominion war battle"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this conflict is from alternate reality"
    },
    "locations": {
      "type": "array",
      "description": "Locations this conflict occurred at",
      "items": LocationBase
    },
    "firstSideBelligerents": {
      "type": "array",
      "description": "Organization involved in conflict on first side",
      "items": OrganizationBase
    },
    "firstSideCommanders": {
      "type": "array",
      "description": "Commanders involved in conflict on first side",
      "items": CharacterBase
    },
    "secondSideBelligerents": {
      "type": "array",
      "description": "Organization involved in conflict on second side",
      "items": OrganizationBase
    },
    "secondSideCommanders": {
      "type": "array",
      "description": "Commanders involved in conflict on second side",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "ConflictFull",
  "x-readme-ref-name": "ConflictFull"
} as const;
export default ConflictFull
