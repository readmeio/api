import WeaponFull from './WeaponFull.js';

const WeaponFullResponse = {
  "type": "object",
  "description": "Response object for single weapon query",
  "properties": {
    "weapon": WeaponFull
  },
  "title": "WeaponFullResponse",
  "x-readme-ref-name": "WeaponFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default WeaponFullResponse
