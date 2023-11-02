import AnimalFull from './AnimalFull.js';

const AnimalFullResponse = {
  "type": "object",
  "description": "Response object for single animal query",
  "properties": {
    "animal": AnimalFull
  },
  "title": "AnimalFullResponse",
  "x-readme-ref-name": "AnimalFullResponse"
} as const;
export default AnimalFullResponse
