import BookBase from './BookBase.js';
import BookSeriesBase from './BookSeriesBase.js';
import CompanyBase from './CompanyBase.js';

const BookSeriesFull = {
  "type": "object",
  "description": "Full book series, returned when queried using UID",
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
      "description": "Number of books in book series"
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
    },
    "parentSeries": {
      "type": "array",
      "description": "Book series this book series is included in",
      "items": BookSeriesBase
    },
    "childSeries": {
      "type": "array",
      "description": "Child book series included in this book series",
      "items": BookSeriesBase
    },
    "publishers": {
      "type": "array",
      "description": "Companies that published this book series",
      "items": CompanyBase
    },
    "books": {
      "type": "array",
      "description": "Books included in this book series",
      "items": BookBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "BookSeriesFull",
  "x-readme-ref-name": "BookSeriesFull"
} as const;
export default BookSeriesFull
