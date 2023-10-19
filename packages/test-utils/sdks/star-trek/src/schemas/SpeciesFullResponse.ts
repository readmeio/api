import SpeciesFull from './SpeciesFull';

const SpeciesFullResponse = {
  "type": "object",
  "description": "Response object for single species query",
  "properties": {
    "species": SpeciesFull
  },
  "title": "SpeciesFullResponse",
  "x-readme-ref-name": "SpeciesFullResponse"
} as const;
export default SpeciesFullResponse
