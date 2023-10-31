import EpisodeFull from './EpisodeFull.js';

const EpisodeFullResponse = {
  "type": "object",
  "description": "Response object for single episode query",
  "properties": {
    "episode": EpisodeFull
  },
  "title": "EpisodeFullResponse",
  "x-readme-ref-name": "EpisodeFullResponse"
} as const;
export default EpisodeFullResponse
