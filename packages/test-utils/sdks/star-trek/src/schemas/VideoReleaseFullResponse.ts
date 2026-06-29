import VideoReleaseFull from './VideoReleaseFull.js';

const VideoReleaseFullResponse = {
  "type": "object",
  "description": "Response object for single video release query",
  "properties": {
    "videoRelease": VideoReleaseFull
  },
  "title": "VideoReleaseFullResponse",
  "x-readme-ref-name": "VideoReleaseFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default VideoReleaseFullResponse
