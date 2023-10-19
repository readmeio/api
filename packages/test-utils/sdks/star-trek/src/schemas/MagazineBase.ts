const MagazineBase = {
  "type": "object",
  "description": "Base magazine, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Magazine unique ID"
    },
    "title": {
      "type": "string",
      "description": "Magazine title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the magazine was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the magazine was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the magazine was published"
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
    "issueNumber": {
      "type": "string",
      "description": "Magazine issue number"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "MagazineBase",
  "x-readme-ref-name": "MagazineBase"
} as const;
export default MagazineBase
