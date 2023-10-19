const CharacterHeader = {
  "type": "object",
  "description": "Header character, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Character unique ID"
    },
    "name": {
      "type": "string",
      "description": "Character name"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "CharacterHeader",
  "x-readme-ref-name": "CharacterHeader"
} as const;
export default CharacterHeader
