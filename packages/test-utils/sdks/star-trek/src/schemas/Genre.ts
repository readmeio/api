const Genre = {
  "type": "object",
  "description": "Genre of video games",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Genre unique ID"
    },
    "name": {
      "type": "string",
      "description": "Genre name"
    }
  },
  "title": "Genre",
  "x-readme-ref-name": "Genre"
} as const;
export default Genre
