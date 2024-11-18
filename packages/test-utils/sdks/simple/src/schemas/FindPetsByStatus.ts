import Pet from './Pet.js';

const FindPetsByStatus = {
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "status": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "available",
                "pending",
                "sold"
              ],
              "default": "available"
            },
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Status values that need to be considered for filter"
          }
        },
        "required": [
          "status"
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
export default FindPetsByStatus
