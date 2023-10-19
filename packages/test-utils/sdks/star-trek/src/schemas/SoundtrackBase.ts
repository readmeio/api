const SoundtrackBase = {
  "type": "object",
  "description": "Base soundtrack, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Soundtrack unique ID"
    },
    "title": {
      "type": "string",
      "description": "Soundtrack title"
    },
    "releaseDate": {
      "type": "string",
      "description": "Release date",
      "format": "date"
    },
    "length": {
      "type": "integer",
      "description": "Length, in seconds"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "SoundtrackBase",
  "x-readme-ref-name": "SoundtrackBase"
} as const;
export default SoundtrackBase
