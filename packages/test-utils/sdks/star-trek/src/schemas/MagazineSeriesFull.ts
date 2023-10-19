import CompanyBase from './CompanyBase';
import MagazineBase from './MagazineBase';
import StaffBase from './StaffBase';

const MagazineSeriesFull = {
  "type": "object",
  "description": "Full magazine series, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Magazine series unique ID"
    },
    "title": {
      "type": "string",
      "description": "Magazine series title"
    },
    "publishedYearFrom": {
      "type": "integer",
      "description": "Year from which the magazine series was published"
    },
    "publishedMonthFrom": {
      "type": "integer",
      "description": "Month from which the magazine series was published"
    },
    "publishedYearTo": {
      "type": "integer",
      "description": "Year to which the magazine series was published"
    },
    "publishedMonthTo": {
      "type": "integer",
      "description": "Month to which the magazine series was published"
    },
    "numberOfIssues": {
      "type": "integer",
      "description": "Number of issues"
    },
    "publishers": {
      "type": "array",
      "description": "Companies that published this magazine series",
      "items": CompanyBase
    },
    "editors": {
      "type": "array",
      "description": "Editors involved in the magazine series",
      "items": StaffBase
    },
    "magazines": {
      "type": "array",
      "description": "Magazines included in this magazine series",
      "items": MagazineBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "MagazineSeriesFull",
  "x-readme-ref-name": "MagazineSeriesFull"
} as const;
export default MagazineSeriesFull
