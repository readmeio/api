import OccupationFull from './OccupationFull.js';

const OccupationFullResponse = {
  "type": "object",
  "description": "Response object for single occupation query",
  "properties": {
    "occupation": OccupationFull
  },
  "title": "OccupationFullResponse",
  "x-readme-ref-name": "OccupationFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default OccupationFullResponse
