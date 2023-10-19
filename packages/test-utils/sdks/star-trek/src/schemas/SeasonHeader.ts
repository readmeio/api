const SeasonHeader = {
  "type": "object",
  "description": "Header season, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Season unique ID"
    },
    "title": {
      "type": "string",
      "description": "Season title"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "SeasonHeader",
  "x-readme-ref-name": "SeasonHeader"
} as const;
export default SeasonHeader
