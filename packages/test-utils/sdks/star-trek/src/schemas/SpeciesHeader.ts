const SpeciesHeader = {
  "type": "object",
  "description": "Header species, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Species unique ID"
    },
    "name": {
      "type": "string",
      "description": "Species name"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "SpeciesHeader",
  "x-readme-ref-name": "SpeciesHeader"
} as const;
export default SpeciesHeader
