import ComicSeriesBase from './ComicSeriesBase.js';
import ComicsBase from './ComicsBase.js';
import CompanyBase from './CompanyBase.js';

const ComicSeriesFull = {
  "type": "object",
  "description": "Full comic series, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Comic series unique ID"
    },
    "title": {
      "type": "string",
      "description": "Comic series title"
    },
    "publishedYearFrom": {
      "type": "integer",
      "description": "Year from which the comic series was published"
    },
    "publishedMonthFrom": {
      "type": "integer",
      "description": "Month from which the comic series was published"
    },
    "publishedDayFrom": {
      "type": "integer",
      "description": "Day from which the comic series was published"
    },
    "publishedYearTo": {
      "type": "integer",
      "description": "Year to which the comic series was published"
    },
    "publishedMonthTo": {
      "type": "integer",
      "description": "Month to which the comic series was published"
    },
    "publishedDayTo": {
      "type": "integer",
      "description": "Day to which the comic series was published"
    },
    "numberOfIssues": {
      "type": "integer",
      "description": "Number of issues"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of comic series stories",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of comic series stories",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of comic series stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic series stories"
    },
    "miniseries": {
      "type": "boolean",
      "description": "Whether it's a miniseries"
    },
    "photonovelSeries": {
      "type": "boolean",
      "description": "Whether it's a photonovel series"
    },
    "parentSeries": {
      "type": "array",
      "description": "Comic series this comic series is included in",
      "items": ComicSeriesBase
    },
    "childSeries": {
      "type": "array",
      "description": "Child comic series included in this comic series",
      "items": ComicSeriesBase
    },
    "publishers": {
      "type": "array",
      "description": "Companies that published this comic series",
      "items": CompanyBase
    },
    "comics": {
      "type": "array",
      "description": "Comics included in this comic series",
      "items": ComicsBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicSeriesFull",
  "x-readme-ref-name": "ComicSeriesFull"
} as const;
export default ComicSeriesFull
