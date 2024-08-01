const ComicSeriesBase = {
  "type": "object",
  "description": "Base comic series, returned in search results",
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
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of comic series stories",
      "format": "float"
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
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicSeriesBase",
  "x-readme-ref-name": "ComicSeriesBase"
} as const;
export default ComicSeriesBase
