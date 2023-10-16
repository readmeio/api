import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import VideoReleaseBase from './VideoReleaseBase';

const VideoReleaseBaseResponse = {"type":"object","description":"Response object for video releases search","properties":{"page":ResponsePage,"sort":ResponseSort,"videoReleases":{"type":"array","description":"List of video releases matching given criteria","items":VideoReleaseBase}},"title":"VideoReleaseBaseResponse","x-readme-ref-name":"VideoReleaseBaseResponse"} as const
;
export default VideoReleaseBaseResponse
