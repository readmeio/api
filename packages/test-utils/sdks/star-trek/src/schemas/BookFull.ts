import BookCollectionBase from './BookCollectionBase';
import BookSeriesBase from './BookSeriesBase';
import CharacterBase from './CharacterBase';
import CompanyBase from './CompanyBase';
import Reference from './Reference';
import StaffBase from './StaffBase';

const BookFull = {
  "type": "object",
  "description": "Full book, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Book unique ID"
    },
    "title": {
      "type": "string",
      "description": "Book title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the book was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the book was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the book was published"
    },
    "numberOfPages": {
      "type": "integer",
      "description": "Number of pages"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of book story",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of book story",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of book story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of book story"
    },
    "novel": {
      "type": "boolean",
      "description": "Whether it's a novel"
    },
    "referenceBook": {
      "type": "boolean",
      "description": "Whether it's a reference book"
    },
    "biographyBook": {
      "type": "boolean",
      "description": "Whether it's a biography book"
    },
    "rolePlayingBook": {
      "type": "boolean",
      "description": "Whether it's a role playing book"
    },
    "eBook": {
      "type": "boolean",
      "description": "Whether it's an e-book"
    },
    "anthology": {
      "type": "boolean",
      "description": "Whether it's an anthology"
    },
    "novelization": {
      "type": "boolean",
      "description": "Whether it's a novelization"
    },
    "audiobook": {
      "type": "boolean",
      "description": "Whether it's an audiobook, or has been release as an audiobook in addition to other form"
    },
    "audiobookAbridged": {
      "type": "boolean",
      "description": "If it's an audiobook, whether it's been abridged"
    },
    "audiobookPublishedYear": {
      "type": "integer",
      "description": "Year the audiobook was published"
    },
    "audiobookPublishedMonth": {
      "type": "integer",
      "description": "Month the audiobook was published"
    },
    "audiobookPublishedDay": {
      "type": "integer",
      "description": "Day the audiobook was published"
    },
    "audiobookRunTime": {
      "type": "integer",
      "description": "Audiobook run time, in minutes"
    },
    "productionNumber": {
      "type": "string",
      "description": "Book production number"
    },
    "bookSeries": {
      "type": "array",
      "description": "Book series this book is included in",
      "items": BookSeriesBase
    },
    "authors": {
      "type": "array",
      "description": "Authors of the book",
      "items": StaffBase
    },
    "artists": {
      "type": "array",
      "description": "Artists involved in the book",
      "items": StaffBase
    },
    "editors": {
      "type": "array",
      "description": "Editors involved in the book",
      "items": StaffBase
    },
    "audiobookNarrators": {
      "type": "array",
      "description": "Audiobook narrators",
      "items": StaffBase
    },
    "publishers": {
      "type": "array",
      "description": "Book publishers",
      "items": CompanyBase
    },
    "audiobookPublishers": {
      "type": "array",
      "description": "Audiobook publishers",
      "items": CompanyBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing the book",
      "items": CharacterBase
    },
    "references": {
      "type": "array",
      "description": "References",
      "items": Reference
    },
    "audiobookReferences": {
      "type": "array",
      "description": "Audiobook references",
      "items": Reference
    },
    "bookCollections": {
      "type": "array",
      "description": "Book collections this book is included in",
      "items": BookCollectionBase
    }
  },
  "required": [
    "uid",
    "title",
    "novel",
    "referenceBook",
    "biographyBook",
    "rolePlayingBook",
    "eBook",
    "anthology",
    "novelization",
    "audiobook",
    "audiobookAbridged"
  ],
  "title": "BookFull",
  "x-readme-ref-name": "BookFull"
} as const;
export default BookFull
