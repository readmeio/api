import CompanyBase from './CompanyBase.js';
import EpisodeBase from './EpisodeBase.js';
import SeasonBase from './SeasonBase.js';

const SeriesFull = {
  "type": "object",
  "description": "Full series, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Series unique ID"
    },
    "title": {
      "type": "string",
      "description": "Series title"
    },
    "abbreviation": {
      "type": "string",
      "description": "Series abbreviation"
    },
    "productionStartYear": {
      "type": "integer",
      "description": "Year the series production started"
    },
    "productionEndYear": {
      "type": "integer",
      "description": "Year the series production ended"
    },
    "originalRunStartDate": {
      "type": "string",
      "description": "Date the series originally ran from",
      "format": "date"
    },
    "originalRunEndDate": {
      "type": "string",
      "description": "Date the series originally ran to",
      "format": "date"
    },
    "seasonsCount": {
      "type": "integer",
      "description": "Number of seasons"
    },
    "episodesCount": {
      "type": "integer",
      "description": "Number of episodes"
    },
    "featureLengthEpisodesCount": {
      "type": "integer",
      "description": "Number of feature length episodes"
    },
    "productionCompany": CompanyBase,
    "originalBroadcaster": CompanyBase,
    "episodes": {
      "type": "array",
      "description": "Episodes in the series",
      "items": EpisodeBase
    },
    "seasons": {
      "type": "array",
      "description": "Seasons in the series",
      "items": SeasonBase
    }
  },
  "required": [
    "uid",
    "title",
    "abbreviation"
  ],
  "title": "SeriesFull",
  "x-readme-ref-name": "SeriesFull"
} as const;
export default SeriesFull
