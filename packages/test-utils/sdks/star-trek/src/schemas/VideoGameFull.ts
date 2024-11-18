import CompanyBase from './CompanyBase.js';
import ContentRating from './ContentRating.js';
import Genre from './Genre.js';
import Platform from './Platform.js';
import Reference from './Reference.js';

const VideoGameFull = {
  "type": "object",
  "description": "Full video game, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Video game unique ID"
    },
    "title": {
      "type": "string",
      "description": "Video game title"
    },
    "releaseDate": {
      "type": "string",
      "description": "Release date",
      "format": "date"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of video game story",
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of video game story",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of video game story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of video game story"
    },
    "systemRequirements": {
      "type": "string",
      "description": "System requirements"
    },
    "publishers": {
      "type": "array",
      "description": "Publishers",
      "items": CompanyBase
    },
    "developers": {
      "type": "array",
      "description": "Developers",
      "items": CompanyBase
    },
    "platforms": {
      "type": "array",
      "description": "Platforms",
      "items": Platform
    },
    "genres": {
      "type": "array",
      "description": "Genres",
      "items": Genre
    },
    "ratings": {
      "type": "array",
      "description": "Ratings",
      "items": ContentRating
    },
    "references": {
      "type": "array",
      "description": "References",
      "items": Reference
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "VideoGameFull",
  "x-readme-ref-name": "VideoGameFull"
} as const;
export default VideoGameFull
