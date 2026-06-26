import MovieFull from './MovieFull.js';

const MovieFullResponse = {
  "type": "object",
  "description": "Response object for single movie query",
  "properties": {
    "movie": MovieFull
  },
  "title": "MovieFullResponse",
  "x-readme-ref-name": "MovieFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MovieFullResponse
