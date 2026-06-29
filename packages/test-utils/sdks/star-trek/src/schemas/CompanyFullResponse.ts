import CompanyFull from './CompanyFull.js';

const CompanyFullResponse = {
  "type": "object",
  "description": "Response object for single company query",
  "properties": {
    "company": CompanyFull
  },
  "title": "CompanyFullResponse",
  "x-readme-ref-name": "CompanyFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CompanyFullResponse
