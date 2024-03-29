const ComicStripBase = {
  "type": "object",
  "description": "Base comic strip, returned in search results",
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
      "description": "Starting year of comic strip story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic strip story"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicStripBase",
  "x-readme-ref-name": "ComicStripBase"
} as const;
export default ComicStripBase
