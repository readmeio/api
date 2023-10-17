import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import SeasonBase from './SeasonBase';

const SeasonBaseResponse = {"type":"object","description":"Response object for seasons search","properties":{"page":ResponsePage,"sort":ResponseSort,"seasons":{"type":"array","description":"List of seasons matching given criteria","items":SeasonBase}},"title":"SeasonBaseResponse","x-readme-ref-name":"SeasonBaseResponse"} as const
;
export default SeasonBaseResponse
