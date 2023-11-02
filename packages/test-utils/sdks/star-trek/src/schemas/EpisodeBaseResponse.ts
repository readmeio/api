import EpisodeBase from './EpisodeBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const EpisodeBaseResponse = {
  "type": "object",
  "description": "Response object for episodes search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "episodes": {
      "type": "array",
      "description": "List of episodes matching given criteria",
      "items": EpisodeBase
    }
  },
  "title": "EpisodeBaseResponse",
  "x-readme-ref-name": "EpisodeBaseResponse"
} as const;
export default EpisodeBaseResponse
