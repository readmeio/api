import Pet from './Pet.js';

const FindPetsByTags = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Tags to filter by"
          }
        },
        "required": [
          "tags"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "array",
      "items": Pet,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default FindPetsByTags
