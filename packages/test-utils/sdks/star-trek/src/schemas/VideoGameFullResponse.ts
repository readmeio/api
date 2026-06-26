import VideoGameFull from './VideoGameFull.js';

const VideoGameFullResponse = {
  "type": "object",
  "description": "Response object for single video game query",
  "properties": {
    "videoGame": VideoGameFull
  },
  "title": "VideoGameFullResponse",
  "x-readme-ref-name": "VideoGameFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default VideoGameFullResponse
