const BookBase = {
  "type": "object",
  "description": "Base book, returned in search results",
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
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of book story",
      "format": "float"
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
      "description": "Whether it's an eBook"
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
      "description": "Book's production number"
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
  "title": "BookBase",
  "x-readme-ref-name": "BookBase"
} as const;
export default BookBase
