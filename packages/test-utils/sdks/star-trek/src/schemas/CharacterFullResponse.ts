import CharacterFull from './CharacterFull.js';

const CharacterFullResponse = {
  "type": "object",
  "description": "Response object for single character query",
  "properties": {
    "character": CharacterFull
  },
  "title": "CharacterFullResponse",
  "x-readme-ref-name": "CharacterFullResponse"
} as const;
export default CharacterFullResponse
