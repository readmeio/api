import LocationFull from './LocationFull.js';

const LocationFullResponse = {
  "type": "object",
  "description": "Response object for single location query",
  "properties": {
    "location": LocationFull
  },
  "title": "LocationFullResponse",
  "x-readme-ref-name": "LocationFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default LocationFullResponse
