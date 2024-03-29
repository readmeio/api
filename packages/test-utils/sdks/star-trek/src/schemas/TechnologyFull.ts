const TechnologyFull = {
  "type": "object",
  "description": "Full technology, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Technology unique ID"
    },
    "name": {
      "type": "string",
      "description": "Technology name"
    },
    "borgTechnology": {
      "type": "boolean",
      "description": "Whether it's a Borg technology"
    },
    "borgComponent": {
      "type": "boolean",
      "description": "Whether it's a Borg component"
    },
    "communicationsTechnology": {
      "type": "boolean",
      "description": "Whether it's a communications technology"
    },
    "computerTechnology": {
      "type": "boolean",
      "description": "Whether it's a computer technology"
    },
    "computerProgramming": {
      "type": "boolean",
      "description": "Whether it's a technology related to computer programming"
    },
    "subroutine": {
      "type": "boolean",
      "description": "Whether it's a subroutine"
    },
    "database": {
      "type": "boolean",
      "description": "Whether it's a database"
    },
    "energyTechnology": {
      "type": "boolean",
      "description": "Whether it's a energy technology"
    },
    "fictionalTechnology": {
      "type": "boolean",
      "description": "Whether it's a fictional technology"
    },
    "holographicTechnology": {
      "type": "boolean",
      "description": "Whether it's a holographic technology"
    },
    "identificationTechnology": {
      "type": "boolean",
      "description": "Whether it's a identification technology"
    },
    "lifeSupportTechnology": {
      "type": "boolean",
      "description": "Whether it's a life support technology"
    },
    "sensorTechnology": {
      "type": "boolean",
      "description": "Whether it's a sensor technology"
    },
    "shieldTechnology": {
      "type": "boolean",
      "description": "Whether it's a shield technology"
    },
    "tool": {
      "type": "boolean",
      "description": "Whether it's a tool"
    },
    "culinaryTool": {
      "type": "boolean",
      "description": "Whether it's a culinary tool"
    },
    "engineeringTool": {
      "type": "boolean",
      "description": "Whether it's a engineering tool"
    },
    "householdTool": {
      "type": "boolean",
      "description": "Whether it's a household tool"
    },
    "medicalEquipment": {
      "type": "boolean",
      "description": "Whether it's a medical equipment"
    },
    "transporterTechnology": {
      "type": "boolean",
      "description": "Whether it's a transporter technology"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "TechnologyFull",
  "x-readme-ref-name": "TechnologyFull"
} as const;
export default TechnologyFull
