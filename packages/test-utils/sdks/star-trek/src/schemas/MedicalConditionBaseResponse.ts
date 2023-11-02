import MedicalConditionBase from './MedicalConditionBase.js';
import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';

const MedicalConditionBaseResponse = {
  "type": "object",
  "description": "Response object for medical conditions search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "medicalConditions": {
      "type": "array",
      "description": "List of medical conditions matching given criteria",
      "items": MedicalConditionBase
    }
  },
  "title": "MedicalConditionBaseResponse",
  "x-readme-ref-name": "MedicalConditionBaseResponse"
} as const;
export default MedicalConditionBaseResponse
