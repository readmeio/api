import SpeciesFull from './SpeciesFull.js';

const SpeciesFullResponse = {
  "type": "object",
  "description": "Response object for single species query",
  "properties": {
    "species": SpeciesFull
  },
  "title": "SpeciesFullResponse",
  "x-readme-ref-name": "SpeciesFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default SpeciesFullResponse
