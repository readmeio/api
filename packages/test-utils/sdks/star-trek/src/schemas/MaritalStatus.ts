const MaritalStatus = {
  "type": "string",
  "description": "Marital status\n\n`SINGLE` `ENGAGED` `MARRIED` `DIVORCED` `REMARRIED` `SEPARATED` `WIDOWED` `CAPTAINS_WOMAN`",
  "enum": [
    "SINGLE",
    "ENGAGED",
    "MARRIED",
    "DIVORCED",
    "REMARRIED",
    "SEPARATED",
    "WIDOWED",
    "CAPTAINS_WOMAN"
  ],
  "title": "MaritalStatus",
  "x-readme-ref-name": "MaritalStatus"
} as const;
export default MaritalStatus
