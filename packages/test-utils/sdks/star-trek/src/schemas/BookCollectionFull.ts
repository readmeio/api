import BookBase from './BookBase';
import BookSeriesBase from './BookSeriesBase';
import CharacterBase from './CharacterBase';
import CompanyBase from './CompanyBase';
import Reference from './Reference';
import StaffBase from './StaffBase';

const BookCollectionFull = {
  "type": "object",
  "description": "Full book collection, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Book collection unique ID"
    },
    "title": {
      "type": "string",
      "description": "Book collection title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the book collection was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the book collection was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the book collection was published"
    },
    "numberOfPages": {
      "type": "integer",
      "description": "Number of pages"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of book collection stories",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of book collection stories",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of book collection stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of book collection stories"
    },
    "bookSeries": {
      "type": "array",
      "description": "Book series this book collection is included in",
      "items": BookSeriesBase
    },
    "authors": {
      "type": "array",
      "description": "Authors of the book collection",
      "items": StaffBase
    },
    "artists": {
      "type": "array",
      "description": "Artists involved in the book collection",
      "items": StaffBase
    },
    "editors": {
      "type": "array",
      "description": "Editors involved in the book collection",
      "items": StaffBase
    },
    "publishers": {
      "type": "array",
      "description": "Book collection publishers",
      "items": CompanyBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing in the book collection",
      "items": CharacterBase
    },
    "references": {
      "type": "array",
      "description": "References",
      "items": Reference
    },
    "books": {
      "type": "array",
      "description": "Books included in this book collection",
      "items": BookBase
    }
  },
  "title": "BookCollectionFull",
  "x-readme-ref-name": "BookCollectionFull"
} as const;
export default BookCollectionFull
