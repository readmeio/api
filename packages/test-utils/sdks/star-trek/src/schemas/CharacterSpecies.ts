const CharacterSpecies = {
  "type": "object",
  "description": "Species a character belongs to",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Entity unique ID"
    },
    "name": {
      "type": "string",
      "description": "Species name"
    },
    "numerator": {
      "type": "integer",
      "description": "Numerator"
    },
    "denominator": {
      "type": "integer",
      "description": "Denominator"
    }
  },
  "title": "CharacterSpecies",
  "x-readme-ref-name": "CharacterSpecies"
} as const;
export default CharacterSpecies
