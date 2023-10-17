const MedicalConditionBase = {"type":"object","description":"Base medical condition, returned in search results","properties":{"uid":{"type":"string","description":"Medical condition unique ID"},"name":{"type":"string","description":"Medical condition name"},"psychologicalCondition":{"type":"boolean","description":"Whether it's a psychological condition"}},"required":["uid","name"],"title":"MedicalConditionBase","x-readme-ref-name":"MedicalConditionBase"} as const
;
export default MedicalConditionBase
