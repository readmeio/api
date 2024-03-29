import CharacterBase from './CharacterBase.js';
import EpisodeBase from './EpisodeBase.js';
import Gender from './Gender.js';
import MovieBase from './MovieBase.js';

const PerformerFull = {
  "type": "object",
  "description": "Full performer, returned when queried using UID",
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
    },
    "episodesPerformances": {
      "type": "array",
      "description": "Episodes in which this person appeared as a performer",
      "items": EpisodeBase
    },
    "episodesStuntPerformances": {
      "type": "array",
      "description": "Episodes in which this person appeared as a stunt performer",
      "items": EpisodeBase
    },
    "episodesStandInPerformances": {
      "type": "array",
      "description": "Episodes in which this person appeared as a stand-in performer",
      "items": EpisodeBase
    },
    "moviesPerformances": {
      "type": "array",
      "description": "Movies in which this person appeared as a performer",
      "items": MovieBase
    },
    "moviesStuntPerformances": {
      "type": "array",
      "description": "Movies in which this person appeared as a stunt performer",
      "items": MovieBase
    },
    "moviesStandInPerformances": {
      "type": "array",
      "description": "Movies in which this person appeared as a stand-in performer",
      "items": MovieBase
    },
    "characters": {
      "type": "array",
      "description": "Characters played by this performer",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "PerformerFull",
  "x-readme-ref-name": "PerformerFull"
} as const;
export default PerformerFull
