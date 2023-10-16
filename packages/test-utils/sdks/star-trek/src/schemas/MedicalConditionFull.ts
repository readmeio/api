const MedicalConditionFull = {"type":"object","description":"Full medical condition, returned when queried using UID","properties":{"uid":{"type":"string","description":"Medical condition unique ID"},"name":{"type":"string","description":"Medical condition name"},"psychologicalCondition":{"type":"boolean","description":"Whether it's a psychological condition"}},"required":["uid","name"],"title":"MedicalConditionFull","x-readme-ref-name":"MedicalConditionFull"} as const
;
export default MedicalConditionFull
