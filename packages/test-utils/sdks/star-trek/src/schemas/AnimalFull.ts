const AnimalFull = {
  "type": "object",
  "description": "Full animal, returned when queried using UID",
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
  "title": "AnimalFull",
  "x-readme-ref-name": "AnimalFull"
} as const;
export default AnimalFull
