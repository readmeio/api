import AstronomicalObjectFull from './AstronomicalObjectFull.js';

const AstronomicalObjectFullResponse = {
  "type": "object",
  "description": "Response object for single astronomical object query",
  "properties": {
    "astronomicalObject": AstronomicalObjectFull
  },
  "title": "AstronomicalObjectFullResponse",
  "x-readme-ref-name": "AstronomicalObjectFullResponse"
} as const;
export default AstronomicalObjectFullResponse
