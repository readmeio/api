import OccupationFull from './OccupationFull';

const OccupationFullResponse = {
  "type": "object",
  "description": "Response object for single occupation query",
  "properties": {
    "occupation": OccupationFull
  },
  "title": "OccupationFullResponse",
  "x-readme-ref-name": "OccupationFullResponse"
} as const;
export default OccupationFullResponse
