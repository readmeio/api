import CharacterBase from './CharacterBase.js';
import ComicCollectionBase from './ComicCollectionBase.js';
import ComicSeriesBase from './ComicSeriesBase.js';
import CompanyBase from './CompanyBase.js';
import Reference from './Reference.js';
import StaffBase from './StaffBase.js';

const ComicsFull = {
  "type": "object",
  "description": "Full comics, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Comics unique ID"
    },
    "title": {
      "type": "string",
      "description": "Comics title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the comics was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the comics was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the comics was published"
    },
    "coverYear": {
      "type": "integer",
      "description": "Cover publication year"
    },
    "coverMonth": {
      "type": "integer",
      "description": "Cover publication month"
    },
    "coverDay": {
      "type": "integer",
      "description": "Cover publication day"
    },
    "numberOfPages": {
      "type": "integer",
      "description": "Number of pages"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of comic story",
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of comic story",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of comic  story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic story"
    },
    "photonovel": {
      "type": "boolean",
      "description": "Whether it's a photonovel"
    },
    "adaptation": {
      "type": "boolean",
      "description": "Whether it's an adaptation of an episode or a movie"
    },
    "comicSeries": {
      "type": "array",
      "description": "Comic series this comics is included in",
      "items": ComicSeriesBase
    },
    "writers": {
      "type": "array",
      "description": "Writers involved in the comics",
      "items": StaffBase
    },
    "artists": {
      "type": "array",
      "description": "Artists involved in the comics",
      "items": StaffBase
    },
    "editors": {
      "type": "array",
      "description": "Editors involved in the comics",
      "items": StaffBase
    },
    "staff": {
      "type": "array",
      "description": "Other staff involved in the comics",
      "items": StaffBase
    },
    "publishers": {
      "type": "array",
      "description": "Comics publishers",
      "items": CompanyBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing in the comics",
      "items": CharacterBase
    },
    "references": {
      "type": "array",
      "description": "References",
      "items": Reference
    },
    "comicCollections": {
      "type": "array",
      "description": "Comic collections this comics is included in",
      "items": ComicCollectionBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicsFull",
  "x-readme-ref-name": "ComicsFull"
} as const;
export default ComicsFull
