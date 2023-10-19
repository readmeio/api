import MovieBase from './MovieBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const MovieBaseResponse = {
  "type": "object",
  "description": "Response object for movies search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "movies": {
      "type": "array",
      "description": "List of movies matching given criteria",
      "items": MovieBase
    }
  },
  "title": "MovieBaseResponse",
  "x-readme-ref-name": "MovieBaseResponse"
} as const;
export default MovieBaseResponse
