import Agency from './Agency.js';

const GetNextripAgencies = {
  "response": {
    "200": {
      "type": "array",
      "items": Agency,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetNextripAgencies
