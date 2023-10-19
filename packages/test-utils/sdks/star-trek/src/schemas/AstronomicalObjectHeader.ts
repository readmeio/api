const AstronomicalObjectHeader = {
  "type": "object",
  "description": "Header astronomical object, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Astronomical object's unique ID"
    },
    "name": {
      "type": "string",
      "description": "Astronomical object name"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "AstronomicalObjectHeader",
  "x-readme-ref-name": "AstronomicalObjectHeader"
} as const;
export default AstronomicalObjectHeader
