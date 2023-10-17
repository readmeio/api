import PerformerBase from './PerformerBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const PerformerBaseResponse = {"type":"object","description":"Response object for performers search","properties":{"page":ResponsePage,"sort":ResponseSort,"performers":{"type":"array","description":"List of performers matching given criteria","items":PerformerBase}},"title":"PerformerBaseResponse","x-readme-ref-name":"PerformerBaseResponse"} as const
;
export default PerformerBaseResponse
