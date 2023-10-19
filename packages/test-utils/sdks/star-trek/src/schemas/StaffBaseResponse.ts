import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import StaffBase from './StaffBase';

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
