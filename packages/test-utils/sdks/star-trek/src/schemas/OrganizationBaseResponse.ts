import OrganizationBase from './OrganizationBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const OrganizationBaseResponse = {"type":"object","description":"Response object for organizations search","properties":{"page":ResponsePage,"sort":ResponseSort,"organizations":{"type":"array","description":"List of organizations matching given criteria","items":OrganizationBase}},"title":"OrganizationBaseResponse","x-readme-ref-name":"OrganizationBaseResponse"} as const
;
export default OrganizationBaseResponse
