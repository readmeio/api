import CharacterBase from './CharacterBase.js';
import ComicSeriesBase from './ComicSeriesBase.js';
import StaffBase from './StaffBase.js';

const ComicStripFull = {
  "type": "object",
  "description": "Full comic strip, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Comic strip unique ID"
    },
    "title": {
      "type": "string",
      "description": "Comic strip title"
    },
    "periodical": {
      "type": "string",
      "description": "Title of the periodical the comic strip was published in"
    },
    "publishedYearFrom": {
      "type": "integer",
      "description": "Year from which the comic strip was published"
    },
    "publishedMonthFrom": {
      "type": "integer",
      "description": "Month from which the comic strip was published"
    },
    "publishedDayFrom": {
      "type": "integer",
      "description": "Day from which the comic strip was published"
    },
    "publishedYearTo": {
      "type": "integer",
      "description": "Year to which the comic strip was published"
    },
    "publishedMonthTo": {
      "type": "integer",
      "description": "Month to which the comic strip was published"
    },
    "publishedDayTo": {
      "type": "integer",
      "description": "Day to which the comic strip was published"
    },
    "numberOfPages": {
      "type": "integer",
      "description": "Number of pages"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of comic strip stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic strip stories"
    },
    "comicSeries": {
      "type": "array",
      "description": "Comic series this comic strip is included in",
      "items": ComicSeriesBase
    },
    "writers": {
      "type": "array",
      "description": "Writers involved in the comic strip",
      "items": StaffBase
    },
    "artists": {
      "type": "array",
      "description": "Artists involved in the comic strip",
      "items": StaffBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing in the comic strip",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicStripFull",
  "x-readme-ref-name": "ComicStripFull"
} as const;
export default ComicStripFull
