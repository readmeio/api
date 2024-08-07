import CharacterBase from './CharacterBase.js';
import PerformerBase from './PerformerBase.js';
import StaffBase from './StaffBase.js';

const MovieFull = {
  "type": "object",
  "description": "Full movie, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Movie unique ID"
    },
    "title": {
      "type": "string",
      "description": "Movie title"
    },
    "mainDirector": StaffBase,
    "titleBulgarian": {
      "type": "string",
      "description": "Movie title in Bulgarian"
    },
    "titleCatalan": {
      "type": "string",
      "description": "Movie title in Catalan"
    },
    "titleChineseTraditional": {
      "type": "string",
      "description": "Movie title in Chinese traditional"
    },
    "titleGerman": {
      "type": "string",
      "description": "Movie title in German"
    },
    "titleItalian": {
      "type": "string",
      "description": "Movie title in Italian"
    },
    "titleJapanese": {
      "type": "string",
      "description": "Movie title in Japanese"
    },
    "titlePolish": {
      "type": "string",
      "description": "Movie title in Polish"
    },
    "titleRussian": {
      "type": "string",
      "description": "Movie title in Russian"
    },
    "titleSerbian": {
      "type": "string",
      "description": "Movie title in Serbian"
    },
    "titleSpanish": {
      "type": "string",
      "description": "Movie title in Spanish"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of movie story",
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of movie story",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of movie story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of movie story"
    },
    "usReleaseDate": {
      "type": "string",
      "description": "Date the movie was first released in the United States",
      "format": "date"
    },
    "writers": {
      "type": "array",
      "description": "Writers involved in the movie",
      "items": StaffBase
    },
    "screenplayAuthors": {
      "type": "array",
      "description": "Screenplay authors involved in the movie",
      "items": StaffBase
    },
    "storyAuthors": {
      "type": "array",
      "description": "Story authors authors involved in the movie",
      "items": StaffBase
    },
    "directors": {
      "type": "array",
      "description": "Directors authors involved in the movie",
      "items": StaffBase
    },
    "producers": {
      "type": "array",
      "description": "Producers authors involved in the movie",
      "items": StaffBase
    },
    "staff": {
      "type": "array",
      "description": "Other staff involved in the movie",
      "items": StaffBase
    },
    "performers": {
      "type": "array",
      "description": "Performers appearing in the movie",
      "items": PerformerBase
    },
    "stuntPerformers": {
      "type": "array",
      "description": "Stunt performers appearing in the movie",
      "items": PerformerBase
    },
    "standInPerformers": {
      "type": "array",
      "description": "Stand-in performers appearing in the movie",
      "items": PerformerBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing in the movie",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "MovieFull",
  "x-readme-ref-name": "MovieFull"
} as const;
export default MovieFull
