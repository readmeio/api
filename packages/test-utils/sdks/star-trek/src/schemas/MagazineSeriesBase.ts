const MagazineSeriesBase = {
  "type": "object",
  "description": "Base magazine series, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Magazine series unique ID"
    },
    "title": {
      "type": "string",
      "description": "Magazine series title"
    },
    "publishedYearFrom": {
      "type": "integer",
      "description": "Year from which the magazine series was published"
    },
    "publishedMonthFrom": {
      "type": "integer",
      "description": "Month from which the magazine series was published"
    },
    "publishedYearTo": {
      "type": "integer",
      "description": "Year to which the magazine series was published"
    },
    "publishedMonthTo": {
      "type": "integer",
      "description": "Month to which the magazine series was published"
    },
    "numberOfIssues": {
      "type": "integer",
      "description": "Number of issues"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "MagazineSeriesBase",
  "x-readme-ref-name": "MagazineSeriesBase"
} as const;
export default MagazineSeriesBase
