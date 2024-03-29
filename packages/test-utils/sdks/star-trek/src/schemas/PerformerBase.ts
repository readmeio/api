import Gender from './Gender.js';

const PerformerBase = {
  "type": "object",
  "description": "Base performer, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Performer unique ID"
    },
    "name": {
      "type": "string",
      "description": "Performer name"
    },
    "birthName": {
      "type": "string",
      "description": "Performer birth name"
    },
    "gender": Gender,
    "dateOfBirth": {
      "type": "string",
      "description": "Date the performer was born",
      "format": "date"
    },
    "placeOfBirth": {
      "type": "string",
      "description": "Place the performer was born"
    },
    "dateOfDeath": {
      "type": "string",
      "description": "Date the performer died",
      "format": "date"
    },
    "placeOfDeath": {
      "type": "string",
      "description": "Place the performer died"
    },
    "animalPerformer": {
      "type": "boolean",
      "description": "Whether it's an animal performer"
    },
    "disPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: Discovery"
    },
    "ds9Performer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: Deep Space Nine"
    },
    "entPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: Enterprise"
    },
    "filmPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in a Star Trek movie"
    },
    "standInPerformer": {
      "type": "boolean",
      "description": "Whether it's a stand-in performer"
    },
    "stuntPerformer": {
      "type": "boolean",
      "description": "Whether it's a stunt performer"
    },
    "tasPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: The Animated Series"
    },
    "tngPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: The Next Generation"
    },
    "tosPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: The Original Series"
    },
    "videoGamePerformer": {
      "type": "boolean",
      "description": "Whether it's a video game performer"
    },
    "voicePerformer": {
      "type": "boolean",
      "description": "Whether it's a voice performer"
    },
    "voyPerformer": {
      "type": "boolean",
      "description": "Whether it's a performer that appeared in Star Trek: Voyager"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "PerformerBase",
  "x-readme-ref-name": "PerformerBase"
} as const;
export default PerformerBase
