import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import TechnologyBase from './TechnologyBase.js';

const TechnologyBaseResponse = {
  "type": "object",
  "description": "Response object for technology search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "technology": {
      "type": "array",
      "description": "List of technology matching given criteria",
      "items": TechnologyBase
    }
  },
  "title": "TechnologyBaseResponse",
  "x-readme-ref-name": "TechnologyBaseResponse"
} as const;
export default TechnologyBaseResponse
