import ComicsBase from './ComicsBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const ComicsBaseResponse = {"type":"object","description":"Response object for comics search","properties":{"page":ResponsePage,"sort":ResponseSort,"comics":{"type":"array","description":"List of comics matching given criteria","items":ComicsBase}},"title":"ComicsBaseResponse","x-readme-ref-name":"ComicsBaseResponse"} as const
;
export default ComicsBaseResponse
