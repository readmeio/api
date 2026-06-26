import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import VideoGameBase from './VideoGameBase.js';

const VideoGameBaseResponse = {
  "type": "object",
  "description": "Response object for video games search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "videoGames": {
      "type": "array",
      "description": "List of video games matching given criteria",
      "items": VideoGameBase
    }
  },
  "title": "VideoGameBaseResponse",
  "x-readme-ref-name": "VideoGameBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default VideoGameBaseResponse
