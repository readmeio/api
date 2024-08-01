import SeasonHeader from './SeasonHeader.js';
import SeriesHeader from './SeriesHeader.js';

const EpisodeBase = {
  "type": "object",
  "description": "Base episode, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Episode unique ID"
    },
    "title": {
      "type": "string",
      "description": "Episode title"
    },
    "titleGerman": {
      "type": "string",
      "description": "Episode title in German"
    },
    "titleItalian": {
      "type": "string",
      "description": "Episode title in Italian"
    },
    "titleJapanese": {
      "type": "string",
      "description": "Episode title in Japanese"
    },
    "series": SeriesHeader,
    "season": SeasonHeader,
    "seasonNumber": {
      "type": "integer",
      "description": "Season number"
    },
    "episodeNumber": {
      "type": "integer",
      "description": "Episode number in season"
    },
    "productionSerialNumber": {
      "type": "string",
      "description": "Production serial number"
    },
    "featureLength": {
      "type": "boolean",
      "description": "Whether it's a feature length episode"
    },
    "stardateFrom": {
      "type": "number",
      "description": "Starting stardate of episode story",
      "format": "float"
    },
    "stardateTo": {
      "type": "number",
      "description": "Ending stardate of episode story",
      "format": "float"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of episode story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of episode story"
    },
    "usAirDate": {
      "type": "string",
      "description": "Date the episode was first aired in the United States",
      "format": "date"
    },
    "finalScriptDate": {
      "type": "string",
      "description": "Date the episode script was completed",
      "format": "date"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "EpisodeBase",
  "x-readme-ref-name": "EpisodeBase"
} as const;
export default EpisodeBase
