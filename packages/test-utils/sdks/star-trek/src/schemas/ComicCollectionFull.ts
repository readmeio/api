import CharacterBase from './CharacterBase.js';
import ComicSeriesBase from './ComicSeriesBase.js';
import ComicsBase from './ComicsBase.js';
import CompanyBase from './CompanyBase.js';
import Reference from './Reference.js';
import StaffBase from './StaffBase.js';

const ComicCollectionFull = {
  "type": "object",
  "description": "Full comic collection, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Comic collection unique ID"
    },
    "title": {
      "type": "string",
      "description": "Comic collection title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the comic collection was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the comic collection was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the comic collection was published"
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
      "description": "Starting stardate of comic collection stories",
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of comic collection stories",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of comic collection stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic collection stories"
    },
    "photonovel": {
      "type": "boolean",
      "description": "Whether it's a photonovel collection"
    },
    "comicSeries": {
      "type": "array",
      "description": "Comic series this comic collection is included in",
      "items": ComicSeriesBase
    },
    "writers": {
      "type": "array",
      "description": "Writers involved in the comic collection",
      "items": StaffBase
    },
    "artists": {
      "type": "array",
      "description": "Artists involved in the comic collection",
      "items": StaffBase
    },
    "editors": {
      "type": "array",
      "description": "Editors involved in the comic collection",
      "items": StaffBase
    },
    "staff": {
      "type": "array",
      "description": "Other staff involved in the comic collection",
      "items": StaffBase
    },
    "publishers": {
      "type": "array",
      "description": "Comic collection publishers",
      "items": CompanyBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing in the comic collection",
      "items": CharacterBase
    },
    "references": {
      "type": "array",
      "description": "References",
      "items": Reference
    },
    "comics": {
      "type": "array",
      "description": "Comics included in this comic collection",
      "items": ComicsBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicCollectionFull",
  "x-readme-ref-name": "ComicCollectionFull"
} as const;
export default ComicCollectionFull
