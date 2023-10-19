const StaffHeader = {
  "type": "object",
  "description": "Header staff, embedded in other objects",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Staff unique ID"
    },
    "name": {
      "type": "string",
      "description": "Staff name"
    }
  },
  "required": [
    "uid",
    "name"
  ],
  "title": "StaffHeader",
  "x-readme-ref-name": "StaffHeader"
} as const;
export default StaffHeader
