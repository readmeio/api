const AnimalBase = {
  "type": "object",
  "description": "Base animal, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Animal unique ID"
    },
    "name": {
      "type": "string",
      "description": "Animal name"
    },
    "earthAnimal": {
      "type": "boolean",
      "description": "Whether it's an earth animal"
    },
    "earthInsect": {
      "type": "boolean",
      "description": "Whether it's an earth insect"
    },
    "avian": {
      "type": "boolean",
      "description": "Whether it's an avian"
    },
    "canine": {
      "type": "boolean",
      "description": "Whether it's a canine"
    },
    "feline": {
      "type": "boolean",
      "description": "Whether it's a feline"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "AnimalBase",
  "x-readme-ref-name": "AnimalBase"
} as const;
export default AnimalBase
