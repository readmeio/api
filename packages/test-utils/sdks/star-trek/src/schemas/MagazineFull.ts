import CompanyBase from './CompanyBase';
import MagazineSeriesBase from './MagazineSeriesBase';
import StaffBase from './StaffBase';

const MagazineFull = {
  "type": "object",
  "description": "Full magazine, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Magazine unique ID"
    },
    "title": {
      "type": "string",
      "description": "Magazine title"
    },
    "publishedYear": {
      "type": "integer",
      "description": "Year the magazine was published"
    },
    "publishedMonth": {
      "type": "integer",
      "description": "Month the magazine was published"
    },
    "publishedDay": {
      "type": "integer",
      "description": "Day the magazine was published"
    },
    "coverYear": {
      "type": "integer",
      "description": "Cover publication year"
    },
    "coverMonth": {
      "type": "integer",
      "description": "Cover publication month"
    },
    "coverDay": {
      "type": "integer",
      "description": "Cover publication day"
    },
    "numberOfPages": {
      "type": "integer",
      "description": "Number of pages"
    },
    "issueNumber": {
      "type": "string",
      "description": "Magazine issue number"
    },
    "magazineSeries": {
      "type": "array",
      "description": "Magazine series this magazine is included in",
      "items": MagazineSeriesBase
    },
    "editors": {
      "type": "array",
      "description": "Editors involved in the magazine",
      "items": StaffBase
    },
    "publishers": {
      "type": "array",
      "description": "Magazine publishers",
      "items": CompanyBase
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "MagazineFull",
  "x-readme-ref-name": "MagazineFull"
} as const;
export default MagazineFull
