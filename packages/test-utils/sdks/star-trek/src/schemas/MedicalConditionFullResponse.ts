import MedicalConditionFull from './MedicalConditionFull.js';

const MedicalConditionFullResponse = {
  "type": "object",
  "description": "Response object for single medical condition query",
  "properties": {
    "medicalCondition": MedicalConditionFull
  },
  "title": "MedicalConditionFullResponse",
  "x-readme-ref-name": "MedicalConditionFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MedicalConditionFullResponse
