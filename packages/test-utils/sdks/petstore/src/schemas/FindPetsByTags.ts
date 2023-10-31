import Pet from './Pet.js';

const FindPetsByTags = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "$schema": "http://json-schema.org/draft-04/schema#",
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
