const GetPetById = {"metadata":{"allOf":[{"type":"object","properties":{"petId":{"type":"integer","format":"int64","minimum":-9223372036854776000,"maximum":9223372036854776000,"$schema":"http://json-schema.org/draft-04/schema#","description":"ID of pet to return"}},"required":["petId"]}]}} as const
;
export default GetPetById
