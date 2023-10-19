import MedicalConditionFull from './MedicalConditionFull';

const MedicalConditionFullResponse = {
  "type": "object",
  "description": "Response object for single medical condition query",
  "properties": {
    "medicalCondition": MedicalConditionFull
  },
  "title": "MedicalConditionFullResponse",
  "x-readme-ref-name": "MedicalConditionFullResponse"
} as const;
export default MedicalConditionFullResponse
