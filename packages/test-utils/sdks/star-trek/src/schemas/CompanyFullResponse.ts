import CompanyFull from './CompanyFull.js';

const CompanyFullResponse = {
  "type": "object",
  "description": "Response object for single company query",
  "properties": {
    "company": CompanyFull
  },
  "title": "CompanyFullResponse",
  "x-readme-ref-name": "CompanyFullResponse"
} as const;
export default CompanyFullResponse
