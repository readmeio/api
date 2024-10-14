import JobOpening from './JobOpening.js';

const GetOpenRoles = {
  "response": {
    "200": {
      "type": "array",
      "items": JobOpening,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetOpenRoles
