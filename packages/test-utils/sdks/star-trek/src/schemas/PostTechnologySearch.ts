const PostTechnologySearch = {
  "formData": {
    "properties": {
      "name": {
        "type": "string",
        "description": "Technology name"
      },
      "borgTechnology": {
        "type": "boolean",
        "description": "Whether it should be a Borg technology"
      },
      "borgComponent": {
        "type": "boolean",
        "description": "Whether it should be a Borg component"
      },
      "communicationsTechnology": {
        "type": "boolean",
        "description": "Whether it should be a communications technology"
      },
      "computerTechnology": {
        "type": "boolean",
        "description": "Whether it should be a computer technology"
      },
      "computerProgramming": {
        "type": "boolean",
        "description": "Whether it should be a technology related to computer programming"
      },
      "subroutine": {
        "type": "boolean",
        "description": "Whether it should be a subroutine"
      },
      "database": {
        "type": "boolean",
        "description": "Whether it should be a database"
      },
      "energyTechnology": {
        "type": "boolean",
        "description": "Whether it should be a energy technology"
      },
      "fictionalTechnology": {
        "type": "boolean",
        "description": "Whether it should be a fictional technology"
      },
      "holographicTechnology": {
        "type": "boolean",
        "description": "Whether it should be a holographic technology"
      },
      "identificationTechnology": {
        "type": "boolean",
        "description": "Whether it should be a identification technology"
      },
      "lifeSupportTechnology": {
        "type": "boolean",
        "description": "Whether it should be a life support technology"
      },
      "sensorTechnology": {
        "type": "boolean",
        "description": "Whether it should be a sensor technology"
      },
      "shieldTechnology": {
        "type": "boolean",
        "description": "Whether it should be a shield technology"
      },
      "tool": {
        "type": "boolean",
        "description": "Whether it should be a tool"
      },
      "culinaryTool": {
        "type": "boolean",
        "description": "Whether it should be a culinary tool"
      },
      "engineeringTool": {
        "type": "boolean",
        "description": "Whether it should be a engineering tool"
      },
      "householdTool": {
        "type": "boolean",
        "description": "Whether it should be a household tool"
      },
      "medicalEquipment": {
        "type": "boolean",
        "description": "Whether it should be a medical equipment"
      },
      "transporterTechnology": {
        "type": "boolean",
        "description": "Whether it's a transporter technology"
      }
    },
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "type": "object",
        "properties": {
          "pageNumber": {
            "type": "integer",
            "format": "int32",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Zero-based page number"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Page size"
          },
          "sort": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "Sorting, serialized like this: fieldName,ASC;anotherFieldName,DESC"
          },
          "apiKey": {
            "type": "string",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "description": "API key"
          }
        },
        "required": []
      }
    ]
  }
} as const;
export default PostTechnologySearch
