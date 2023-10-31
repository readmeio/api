import MovieFull from './MovieFull.js';

const MovieFullResponse = {
  "type": "object",
  "description": "Response object for single movie query",
  "properties": {
    "movie": MovieFull
  },
  "title": "MovieFullResponse",
  "x-readme-ref-name": "MovieFullResponse"
} as const;
export default MovieFullResponse
