const GetMovie = {"metadata":{"allOf":[{"type":"object","properties":{"uid":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#","description":"Movie unique ID"},"apiKey":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#","description":"API key"}},"required":["uid"]}]}} as const
;
export default GetMovie
