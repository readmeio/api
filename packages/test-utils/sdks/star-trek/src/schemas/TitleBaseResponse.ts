import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import TitleBase from './TitleBase';

const TitleBaseResponse = {"type":"object","description":"Response object for titles search","properties":{"page":ResponsePage,"sort":ResponseSort,"titles":{"type":"array","description":"List of titles matching given criteria","items":TitleBase}},"title":"TitleBaseResponse","x-readme-ref-name":"TitleBaseResponse"} as const
;
export default TitleBaseResponse
