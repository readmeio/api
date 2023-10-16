import LocationBase from './LocationBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const LocationBaseResponse = {"type":"object","description":"Response object for locations search","properties":{"page":ResponsePage,"sort":ResponseSort,"locations":{"type":"array","description":"List of locations matching given criteria","items":LocationBase}},"title":"LocationBaseResponse","x-readme-ref-name":"LocationBaseResponse"} as const
;
export default LocationBaseResponse
