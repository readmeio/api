import CharacterFull from './CharacterFull.js';

const CharacterFullResponse = {
  "type": "object",
  "description": "Response object for single character query",
  "properties": {
    "character": CharacterFull
  },
  "title": "CharacterFullResponse",
  "x-readme-ref-name": "CharacterFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CharacterFullResponse
