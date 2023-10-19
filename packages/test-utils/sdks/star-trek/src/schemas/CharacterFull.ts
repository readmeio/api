import BloodType from './BloodType';
import CharacterRelation from './CharacterRelation';
import CharacterSpecies from './CharacterSpecies';
import EpisodeBase from './EpisodeBase';
import Gender from './Gender';
import MaritalStatus from './MaritalStatus';
import MovieBase from './MovieBase';
import OccupationBase from './OccupationBase';
import OrganizationBase from './OrganizationBase';
import PerformerBase from './PerformerBase';
import TitleBase from './TitleBase';

const CharacterFull = {
  "type": "object",
  "description": "Full character, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Character unique ID"
    },
    "name": {
      "type": "string",
      "description": "Character name"
    },
    "gender": Gender,
    "yearOfBirth": {
      "type": "integer",
      "description": "Year the character was born"
    },
    "monthOfBirth": {
      "type": "integer",
      "description": "Month the character was born"
    },
    "dayOfBirth": {
      "type": "integer",
      "description": "Day the character was born"
    },
    "placeOfBirth": {
      "type": "string",
      "description": "Place of birth"
    },
    "yearOfDeath": {
      "type": "integer",
      "description": "Year the character died"
    },
    "monthOfDeath": {
      "type": "integer",
      "description": "Month the character died"
    },
    "dayOfDeath": {
      "type": "integer",
      "description": "Day the character died"
    },
    "placeOfDeath": {
      "type": "string",
      "description": "Place of death"
    },
    "height": {
      "type": "integer",
      "description": "Height in centimeters"
    },
    "weight": {
      "type": "integer",
      "description": "Weight in kilograms"
    },
    "deceased": {
      "type": "boolean",
      "description": "Whether this character is deceased"
    },
    "bloodType": BloodType,
    "maritalStatus": MaritalStatus,
    "serialNumber": {
      "type": "string",
      "description": "Serial number"
    },
    "hologramActivationDate": {
      "type": "string",
      "description": "Hologram activation date"
    },
    "hologramStatus": {
      "type": "string",
      "description": "Hologram status"
    },
    "hologramDateStatus": {
      "type": "string",
      "description": "Hologram date status"
    },
    "hologram": {
      "type": "boolean",
      "description": "Whether this character is a hologram"
    },
    "fictionalCharacter": {
      "type": "boolean",
      "description": "Whether this character is a fictional character (from universe point of view)"
    },
    "mirror": {
      "type": "boolean",
      "description": "Whether this character is from mirror universe"
    },
    "alternateReality": {
      "type": "boolean",
      "description": "Whether this character is from alternate reality"
    },
    "performers": {
      "type": "array",
      "description": "Performers who played this character",
      "items": PerformerBase
    },
    "episodes": {
      "type": "array",
      "description": "Episodes in which this character appeared",
      "items": EpisodeBase
    },
    "movies": {
      "type": "array",
      "description": "Movies in which this character appeared",
      "items": MovieBase
    },
    "characterSpecies": {
      "type": "array",
      "description": "Species this character belongs to",
      "items": CharacterSpecies
    },
    "characterRelations": {
      "type": "array",
      "description": "Relations with other characters",
      "items": CharacterRelation
    },
    "titles": {
      "type": "array",
      "description": "Titles this character holds",
      "items": TitleBase
    },
    "occupations": {
      "type": "array",
      "description": "Occupations of this character",
      "items": OccupationBase
    },
    "organizations": {
      "type": "array",
      "description": "Organizations this character has affiliation with",
      "items": OrganizationBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "CharacterFull",
  "x-readme-ref-name": "CharacterFull"
} as const;
export default CharacterFull
