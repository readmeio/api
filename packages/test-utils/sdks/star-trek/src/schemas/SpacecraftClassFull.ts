import OrganizationBase from './OrganizationBase.js';
import SpacecraftBase from './SpacecraftBase.js';
import SpacecraftType from './SpacecraftType.js';
import SpeciesHeader from './SpeciesHeader.js';

const SpacecraftClassFull = {
  "type": "object",
  "description": "Full spacecraft class, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Spacecraft class unique ID"
    },
    "name": {
      "type": "string",
      "description": "Spacecraft class name"
    },
    "numberOfDecks": {
      "type": "integer",
      "description": "Number of decks"
    },
    "warpCapable": {
      "type": "boolean",
      "description": "Whether it's a warp-capable spacecraft class"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this spacecraft class is from alternate reality"
    },
    "activeFrom": {
      "type": "string",
      "description": "Starting period when this spacecraft class was in use"
    },
    "activeTo": {
      "type": "string",
      "description": "Ending period when this spacecraft class was in use"
    },
    "species": SpeciesHeader,
    "owner": OrganizationBase,
    "operator": OrganizationBase,
    "affiliation": OrganizationBase,
    "spacecraftTypes": {
      "type": "array",
      "description": "Spacecraft types",
      "items": SpacecraftType
    },
    "spacecrafts": {
      "type": "array",
      "description": "Spacecrafts",
      "items": SpacecraftBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "SpacecraftClassFull",
  "x-readme-ref-name": "SpacecraftClassFull"
} as const;
export default SpacecraftClassFull
