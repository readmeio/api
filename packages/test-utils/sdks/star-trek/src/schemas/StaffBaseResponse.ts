import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import StaffBase from './StaffBase.js';

const StaffBaseResponse = {
  "type": "object",
  "description": "Response object for staff search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "staff": {
      "type": "array",
      "description": "List of staff matching given criteria",
      "items": StaffBase
    }
  },
  "title": "StaffBaseResponse",
  "x-readme-ref-name": "StaffBaseResponse"
} as const;
export default StaffBaseResponse
