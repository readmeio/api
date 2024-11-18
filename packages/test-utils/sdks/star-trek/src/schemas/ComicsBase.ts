const ComicsBase = {
  "type": "object",
  "description": "Base comics, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Comics unique ID"
    },
    "title": {
      "type": "string",
      "description": "Comics title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the comics was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the comics was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the comics was published"
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
      "description": "Starting stardate of comic story",
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of comic story",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of comic story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of comic story"
    },
    "photonovel": {
      "type": "boolean",
      "description": "Whether it's a photonovel"
    },
    "adaptation": {
      "type": "boolean",
      "description": "Whether it's an adaptation of an episode or a movie"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "ComicsBase",
  "x-readme-ref-name": "ComicsBase"
} as const;
export default ComicsBase
