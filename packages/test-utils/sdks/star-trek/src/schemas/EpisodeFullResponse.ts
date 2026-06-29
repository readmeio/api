import EpisodeFull from './EpisodeFull.js';

const EpisodeFullResponse = {
  "type": "object",
  "description": "Response object for single episode query",
  "properties": {
    "episode": EpisodeFull
  },
  "title": "EpisodeFullResponse",
  "x-readme-ref-name": "EpisodeFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default EpisodeFullResponse
