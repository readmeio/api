import CompanyBase from './CompanyBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const CompanyBaseResponse = {"type":"object","description":"Response object for companies search","properties":{"page":ResponsePage,"sort":ResponseSort,"companies":{"type":"array","description":"List of companies matching given criteria","items":CompanyBase}},"title":"CompanyBaseResponse","x-readme-ref-name":"CompanyBaseResponse"} as const
;
export default CompanyBaseResponse
