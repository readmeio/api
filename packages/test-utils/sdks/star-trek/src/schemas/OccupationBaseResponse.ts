import OccupationBase from './OccupationBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const OccupationBaseResponse = {"type":"object","description":"Response object for occupations search","properties":{"page":ResponsePage,"sort":ResponseSort,"occupations":{"type":"array","description":"List of occupations matching given criteria","items":OccupationBase}},"title":"OccupationBaseResponse","x-readme-ref-name":"OccupationBaseResponse"} as const
;
export default OccupationBaseResponse
