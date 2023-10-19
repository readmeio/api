import CompanyHeader from './CompanyHeader';

const SeriesBase = {
  "type": "object",
  "description": "Base series, returned in search results",
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
    "productionCompany": CompanyHeader,
    "originalBroadcaster": CompanyHeader
  },
  "required": [
    "uid",
    "title",
    "abbreviation"
  ],
  "title": "SeriesBase",
  "x-readme-ref-name": "SeriesBase"
} as const;
export default SeriesBase
