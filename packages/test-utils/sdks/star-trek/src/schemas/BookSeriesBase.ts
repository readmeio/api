const BookSeriesBase = {
  "type": "object",
  "description": "Base book series, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Book series unique ID"
    },
    "title": {
      "type": "string",
      "description": "Book series title"
    },
    "publishedYearFrom": {
      "type": "integer",
      "description": "Year from which the book series was published"
    },
    "publishedMonthFrom": {
      "type": "integer",
      "description": "Month from which the book series was published"
    },
    "publishedYearTo": {
      "type": "integer",
      "description": "Year to which the book series was published"
    },
    "publishedMonthTo": {
      "type": "integer",
      "description": "Month to which the book series was published"
    },
    "numberOfBooks": {
      "type": "integer",
      "description": "Number of pages"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of book series stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of book series stories"
    },
    "miniseries": {
      "type": "boolean",
      "description": "Whether it's a miniseries"
    },
    "eBookSeries": {
      "type": "boolean",
      "description": "Whether it's a e-book series"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "BookSeriesBase",
  "x-readme-ref-name": "BookSeriesBase"
} as const;
export default BookSeriesBase
