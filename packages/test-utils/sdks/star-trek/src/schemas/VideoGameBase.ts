const VideoGameBase = {
  "type": "object",
  "description": "Base video game, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Video game unique ID"
    },
    "title": {
      "type": "string",
      "description": "Video game title"
    },
    "releaseDate": {
      "type": "string",
      "description": "Release date",
      "format": "date"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of video game story",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of video game story",
      "format": "float",
      "minimum": -3.402823669209385e+38,
      "maximum": 3.402823669209385e+38
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of video game story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of video game story"
    },
    "systemRequirements": {
      "type": "string",
      "description": "System requirements"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "VideoGameBase",
  "x-readme-ref-name": "VideoGameBase"
} as const;
export default VideoGameBase
