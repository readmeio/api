import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import VideoReleaseBase from './VideoReleaseBase.js';

const VideoReleaseBaseResponse = {
  "type": "object",
  "description": "Response object for video releases search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "videoReleases": {
      "type": "array",
      "description": "List of video releases matching given criteria",
      "items": VideoReleaseBase
    }
  },
  "title": "VideoReleaseBaseResponse",
  "x-readme-ref-name": "VideoReleaseBaseResponse"
} as const;
export default VideoReleaseBaseResponse
