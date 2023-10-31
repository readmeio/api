import OrganizationBase from './OrganizationBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const OrganizationBaseResponse = {
  "type": "object",
  "description": "Response object for organizations search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "organizations": {
      "type": "array",
      "description": "List of organizations matching given criteria",
      "items": OrganizationBase
    }
  },
  "title": "OrganizationBaseResponse",
  "x-readme-ref-name": "OrganizationBaseResponse"
} as const;
export default OrganizationBaseResponse
