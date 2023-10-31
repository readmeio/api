import EpisodeBase from './EpisodeBase.js';
import Gender from './Gender.js';
import MovieBase from './MovieBase.js';

const StaffFull = {
  "type": "object",
  "description": "Full staff, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Staff unique ID"
    },
    "name": {
      "type": "string",
      "description": "Staff name"
    },
    "birthName": {
      "type": "string",
      "description": "Staff birth name"
    },
    "gender": Gender,
    "dateOfBirth": {
      "type": "string",
      "description": "Date the staff was born",
      "format": "date"
    },
    "placeOfBirth": {
      "type": "string",
      "description": "Place the staff was born"
    },
    "dateOfDeath": {
      "type": "string",
      "description": "Date the staff died",
      "format": "date"
    },
    "placeOfDeath": {
      "type": "string",
      "description": "Place the staff died"
    },
    "artDepartment": {
      "type": "boolean",
      "description": "Whether this person is from art department"
    },
    "artDirector": {
      "type": "boolean",
      "description": "Whether this person is an art director"
    },
    "productionDesigner": {
      "type": "boolean",
      "description": "Whether this person is a production designer"
    },
    "cameraAndElectricalDepartment": {
      "type": "boolean",
      "description": "Whether this person is from camera and electrical department"
    },
    "cinematographer": {
      "type": "boolean",
      "description": "Whether this person is a cinematographer"
    },
    "castingDepartment": {
      "type": "boolean",
      "description": "Whether this person is from casting department"
    },
    "costumeDepartment": {
      "type": "boolean",
      "description": "Whether this person is from costume department"
    },
    "costumeDesigner": {
      "type": "boolean",
      "description": "Whether this person is a custume designer"
    },
    "director": {
      "type": "boolean",
      "description": "Whether this person is a director"
    },
    "assistantOrSecondUnitDirector": {
      "type": "boolean",
      "description": "Whether this person is an assistant or secound unit director director"
    },
    "exhibitAndAttractionStaff": {
      "type": "boolean",
      "description": "Whether this person is an exhibit and attraction staff"
    },
    "filmEditor": {
      "type": "boolean",
      "description": "Whether this person is a film editor"
    },
    "linguist": {
      "type": "boolean",
      "description": "Whether this person is a linguist"
    },
    "locationStaff": {
      "type": "boolean",
      "description": "Whether this person is a location staff"
    },
    "makeupStaff": {
      "type": "boolean",
      "description": "Whether this person is a make-up staff"
    },
    "musicDepartment": {
      "type": "boolean",
      "description": "Whether this person is from music department"
    },
    "composer": {
      "type": "boolean",
      "description": "Whether this person is a composer"
    },
    "personalAssistant": {
      "type": "boolean",
      "description": "Whether this person is a personal assistant"
    },
    "producer": {
      "type": "boolean",
      "description": "Whether this person is a producer"
    },
    "productionAssociate": {
      "type": "boolean",
      "description": "Whether this person is a production associate"
    },
    "productionStaff": {
      "type": "boolean",
      "description": "Whether this person is a production staff"
    },
    "publicationStaff": {
      "type": "boolean",
      "description": "Whether this person is a publication staff"
    },
    "scienceConsultant": {
      "type": "boolean",
      "description": "Whether this person is a science consultant"
    },
    "soundDepartment": {
      "type": "boolean",
      "description": "Whether this person is from sound department"
    },
    "specialAndVisualEffectsStaff": {
      "type": "boolean",
      "description": "Whether this person is a special and visual effects staff"
    },
    "author": {
      "type": "boolean",
      "description": "Whether this person is an author"
    },
    "audioAuthor": {
      "type": "boolean",
      "description": "Whether this person is an audio author"
    },
    "calendarArtist": {
      "type": "boolean",
      "description": "Whether this person is a calendar artist"
    },
    "comicArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic artist"
    },
    "comicAuthor": {
      "type": "boolean",
      "description": "Whether this person is a comic author"
    },
    "comicColorArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic color artist"
    },
    "comicInteriorArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic interior artist"
    },
    "comicInkArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic ink artist"
    },
    "comicPencilArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic pencil artist"
    },
    "comicLetterArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic letter artist"
    },
    "comicStripArtist": {
      "type": "boolean",
      "description": "Whether this person is a comic strip artist"
    },
    "gameArtist": {
      "type": "boolean",
      "description": "Whether this person is a game artist"
    },
    "gameAuthor": {
      "type": "boolean",
      "description": "Whether this person is a game author"
    },
    "novelArtist": {
      "type": "boolean",
      "description": "Whether this person is a novel artist"
    },
    "novelAuthor": {
      "type": "boolean",
      "description": "Whether this person is a novel author"
    },
    "referenceArtist": {
      "type": "boolean",
      "description": "Whether this person is a reference artist"
    },
    "referenceAuthor": {
      "type": "boolean",
      "description": "Whether this person is a reference author"
    },
    "publicationArtist": {
      "type": "boolean",
      "description": "Whether this person is a publication artist"
    },
    "publicationDesigner": {
      "type": "boolean",
      "description": "Whether this person is a publication designer"
    },
    "publicationEditor": {
      "type": "boolean",
      "description": "Whether this person is a publication editor"
    },
    "publicityArtist": {
      "type": "boolean",
      "description": "Whether this person is a publicity artist"
    },
    "cbsDigitalStaff": {
      "type": "boolean",
      "description": "Whether this person is a part of CBS digital staff"
    },
    "ilmProductionStaff": {
      "type": "boolean",
      "description": "Whether this person is a part of ILM production staff"
    },
    "specialFeaturesStaff": {
      "type": "boolean",
      "description": "Whether this person is a special features artist"
    },
    "storyEditor": {
      "type": "boolean",
      "description": "Whether this person is a story editor"
    },
    "studioExecutive": {
      "type": "boolean",
      "description": "Whether this person is a studio executive"
    },
    "stuntDepartment": {
      "type": "boolean",
      "description": "Whether this person is from stunt department"
    },
    "transportationDepartment": {
      "type": "boolean",
      "description": "Whether this person is from transportation department"
    },
    "videoGameProductionStaff": {
      "type": "boolean",
      "description": "Whether this person is video game production staff"
    },
    "writer": {
      "type": "boolean",
      "description": "Whether this person is a writer"
    },
    "writtenEpisodes": {
      "type": "array",
      "description": "Episodes written by this person",
      "items": EpisodeBase
    },
    "teleplayAuthoredEpisodes": {
      "type": "array",
      "description": "Episodes to which this person has written teleplay",
      "items": EpisodeBase
    },
    "storyAuthoredEpisodes": {
      "type": "array",
      "description": "Episodes to which this person has written story",
      "items": EpisodeBase
    },
    "directedEpisodes": {
      "type": "array",
      "description": "Episodes directed by this person",
      "items": EpisodeBase
    },
    "episodes": {
      "type": "array",
      "description": "Episodes on which this person worked",
      "items": EpisodeBase
    },
    "writtenMovies": {
      "type": "array",
      "description": "Movies written by this person",
      "items": MovieBase
    },
    "screenplayAuthoredMovies": {
      "type": "array",
      "description": "Movies to which this person has written screenplay",
      "items": MovieBase
    },
    "storyAuthoredMovies": {
      "type": "array",
      "description": "Movies to which this person has written story",
      "items": MovieBase
    },
    "directedMovies": {
      "type": "array",
      "description": "Movies directed by this person",
      "items": MovieBase
    },
    "producedMovies": {
      "type": "array",
      "description": "Movies produced by this person",
      "items": MovieBase
    },
    "movies": {
      "type": "array",
      "description": "Movies on which this person worked",
      "items": MovieBase
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "StaffFull",
  "x-readme-ref-name": "StaffFull"
} as const;
export default StaffFull
