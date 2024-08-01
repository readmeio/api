import StaffHeader from './StaffHeader.js';

const MovieBase = {
  "type": "object",
  "description": "Base movie, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Movie unique ID"
    },
    "title": {
      "type": "string",
      "description": "Movie title"
    },
    "mainDirector": StaffHeader,
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
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "MovieBase",
  "x-readme-ref-name": "MovieBase"
} as const;
export default MovieBase
