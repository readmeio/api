import LocationFull from './LocationFull.js';

const LocationFullResponse = {
  "type": "object",
  "description": "Response object for single location query",
  "properties": {
    "location": LocationFull
  },
  "title": "LocationFullResponse",
  "x-readme-ref-name": "LocationFullResponse"
} as const;
export default LocationFullResponse
