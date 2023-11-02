import BloodType from './BloodType.js';
import Gender from './Gender.js';
import MaritalStatus from './MaritalStatus.js';

const CharacterBase = {
  "type": "object",
  "description": "Base character, returned in search results",
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
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "CharacterBase",
  "x-readme-ref-name": "CharacterBase"
} as const;
export default CharacterBase
