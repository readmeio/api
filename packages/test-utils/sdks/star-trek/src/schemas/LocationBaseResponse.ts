import LocationBase from './LocationBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const LocationBaseResponse = {
  "type": "object",
  "description": "Response object for locations search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "locations": {
      "type": "array",
      "description": "List of locations matching given criteria",
      "items": LocationBase
    }
  },
  "title": "LocationBaseResponse",
  "x-readme-ref-name": "LocationBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default LocationBaseResponse
