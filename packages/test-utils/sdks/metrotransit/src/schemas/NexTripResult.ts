import AlertMessage from './AlertMessage';
import Departure from './Departure';
import Stop from './Stop';

const NexTripResult = {"type":"object","properties":{"stops":{"type":["array","null"],"items":Stop},"alerts":{"type":["array","null"],"items":AlertMessage},"departures":{"type":["array","null"],"items":Departure}},"additionalProperties":false,"title":"NexTripResult","x-readme-ref-name":"NexTripResult"} as const
;
export default NexTripResult
