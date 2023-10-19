const ComicCollectionBase = {
  "type": "object",
  "description": "Base comic collection, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Comic collection unique ID"
    },
    "title": {
      "type": "string",
      "description": "Comic collection title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the comic collection was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the comic collection was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the comic collection was published"
    },
    "coverYear": {
      "type": "integer",
      "description": "Cover publication year"
    },
    "coverMonth": {
      "type": "integer",
      "description": "Cover publication month"
    },
    "coverDay": {
      "type": "integer",
      "description": "Cover publication day"
    },
    "numberOfPages": {
      "type": "integer",
      "description": "Number of pages"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of comic collection stories",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of comic collection stories",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of comic collection stories"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic collection stories"
    },
    "photonovel": {
      "type": "boolean",
      "description": "Whether it's a photonovel collection"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicCollectionBase",
  "x-readme-ref-name": "ComicCollectionBase"
} as const;
export default ComicCollectionBase
