import CharacterBase from './CharacterBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const CharacterBaseResponse = {
  "type": "object",
  "description": "Response object for characters search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "characters": {
      "type": "array",
      "description": "List of characters matching given criteria",
      "items": CharacterBase
    }
  },
  "title": "CharacterBaseResponse",
  "x-readme-ref-name": "CharacterBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CharacterBaseResponse
