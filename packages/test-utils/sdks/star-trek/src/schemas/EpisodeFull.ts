import CharacterBase from './CharacterBase.js';
import PerformerBase from './PerformerBase.js';
import SeasonBase from './SeasonBase.js';
import SeriesBase from './SeriesBase.js';
import StaffBase from './StaffBase.js';

const EpisodeFull = {
  "type": "object",
  "description": "Full episode, returned when queried using UID",
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
    "series": SeriesBase,
    "season": SeasonBase,
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
    },
    "writers": {
      "type": "array",
      "description": "Writers involved in the episode",
      "items": StaffBase
    },
    "teleplayAuthors": {
      "type": "array",
      "description": "Teleplay authors involved in the episode",
      "items": StaffBase
    },
    "storyAuthors": {
      "type": "array",
      "description": "Story authors involved in the episode",
      "items": StaffBase
    },
    "directors": {
      "type": "array",
      "description": "Directors authors involved in the episode",
      "items": StaffBase
    },
    "performers": {
      "type": "array",
      "description": "Performers appearing in the episode",
      "items": PerformerBase
    },
    "stuntPerformers": {
      "type": "array",
      "description": "Stunt performers appearing in the episode",
      "items": PerformerBase
    },
    "standInPerformers": {
      "type": "array",
      "description": "Stand-in performers appearing in the episode",
      "items": PerformerBase
    },
    "characters": {
      "type": "array",
      "description": "Characters appearing in the episode",
      "items": CharacterBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "EpisodeFull",
  "x-readme-ref-name": "EpisodeFull"
} as const;
export default EpisodeFull
