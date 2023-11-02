import AstronomicalObjectHeader from './AstronomicalObjectHeader.js';
import AstronomicalObjectType from './AstronomicalObjectType.js';

const AstronomicalObjectBase = {
  "type": "object",
  "description": "Base astronomical object, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Astronomical object's unique ID"
    },
    "name": {
      "type": "string",
      "description": "Astronomical object name"
    },
    "astronomicalObjectType": AstronomicalObjectType,
    "location": AstronomicalObjectHeader
  },
  "required": [
    "uid",
    "name",
    "astronomicalObjectType"
  ],
  "title": "AstronomicalObjectBase",
  "x-readme-ref-name": "AstronomicalObjectBase"
} as const;
export default AstronomicalObjectBase
