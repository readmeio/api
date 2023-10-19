import SeriesHeader from './SeriesHeader';

const SeasonBase = {
  "type": "object",
  "description": "Base season, returned in search results",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Season unique ID"
    },
    "title": {
      "type": "string",
      "description": "Season title"
    },
    "series": SeriesHeader,
    "seasonNumber": {
      "type": "integer",
      "description": "Season number in series"
    },
    "numberOfEpisodes": {
      "type": "integer",
      "description": "Number of episodes in this season"
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "SeasonBase",
  "x-readme-ref-name": "SeasonBase"
} as const;
export default SeasonBase
