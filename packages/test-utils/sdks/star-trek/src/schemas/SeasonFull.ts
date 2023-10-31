import EpisodeBase from './EpisodeBase.js';
import SeriesBase from './SeriesBase.js';

const SeasonFull = {
  "type": "object",
  "description": "Full location, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Season unique ID"
    },
    "title": {
      "type": "string",
      "description": "Season title"
    },
    "series": SeriesBase,
    "seasonNumber": {
      "type": "integer",
      "description": "Season number in series"
    },
    "numberOfEpisodes": {
      "type": "integer",
      "description": "Number of episodes in this season"
    },
    "episodes": {
      "type": "array",
      "description": "Episodes in this season",
      "items": EpisodeBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "SeasonFull",
  "x-readme-ref-name": "SeasonFull"
} as const;
export default SeasonFull
