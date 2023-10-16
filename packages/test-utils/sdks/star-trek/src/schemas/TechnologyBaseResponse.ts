import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import TechnologyBase from './TechnologyBase';

const TechnologyBaseResponse = {"type":"object","description":"Response object for technology search","properties":{"page":ResponsePage,"sort":ResponseSort,"technology":{"type":"array","description":"List of technology matching given criteria","items":TechnologyBase}},"title":"TechnologyBaseResponse","x-readme-ref-name":"TechnologyBaseResponse"} as const
;
export default TechnologyBaseResponse
