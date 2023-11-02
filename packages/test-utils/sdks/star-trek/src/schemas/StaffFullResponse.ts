import StaffFull from './StaffFull.js';

const StaffFullResponse = {
  "type": "object",
  "description": "Response object for single staff query",
  "properties": {
    "staff": StaffFull
  },
  "title": "StaffFullResponse",
  "x-readme-ref-name": "StaffFullResponse"
} as const;
export default StaffFullResponse
