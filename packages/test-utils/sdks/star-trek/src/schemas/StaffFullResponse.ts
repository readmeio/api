import StaffFull from './StaffFull.js';

const StaffFullResponse = {
  "type": "object",
  "description": "Response object for single staff query",
  "properties": {
    "staff": StaffFull
  },
  "title": "StaffFullResponse",
  "x-readme-ref-name": "StaffFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default StaffFullResponse
