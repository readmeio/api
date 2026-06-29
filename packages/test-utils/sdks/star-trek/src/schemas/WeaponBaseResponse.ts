import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import WeaponBase from './WeaponBase.js';

const WeaponBaseResponse = {
  "type": "object",
  "description": "Response object for weapons search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "weapons": {
      "type": "array",
      "description": "List of weapons matching given criteria",
      "items": WeaponBase
    }
  },
  "title": "WeaponBaseResponse",
  "x-readme-ref-name": "WeaponBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default WeaponBaseResponse
