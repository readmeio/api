import CompanyBase from './CompanyBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const CompanyBaseResponse = {
  "type": "object",
  "description": "Response object for companies search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "companies": {
      "type": "array",
      "description": "List of companies matching given criteria",
      "items": CompanyBase
    }
  },
  "title": "CompanyBaseResponse",
  "x-readme-ref-name": "CompanyBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CompanyBaseResponse
