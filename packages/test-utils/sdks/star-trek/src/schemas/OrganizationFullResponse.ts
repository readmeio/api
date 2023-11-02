import OrganizationFull from './OrganizationFull.js';

const OrganizationFullResponse = {
  "type": "object",
  "description": "Response object for single organization query",
  "properties": {
    "organization": OrganizationFull
  },
  "title": "OrganizationFullResponse",
  "x-readme-ref-name": "OrganizationFullResponse"
} as const;
export default OrganizationFullResponse
