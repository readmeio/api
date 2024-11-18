const BookCollectionBase = {
  "type": "object",
  "description": "Base book collection, returned in search results",
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
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of book collection stories",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of book collection stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of book collection stories"
    }
  },
  "title": "BookCollectionBase",
  "x-readme-ref-name": "BookCollectionBase"
} as const;
export default BookCollectionBase
