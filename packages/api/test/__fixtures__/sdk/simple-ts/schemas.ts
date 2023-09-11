const Category = {"type":"object","properties":{"id":{"type":"integer","format":"int64","minimum":-9223372036854776000,"maximum":9223372036854776000},"name":{"type":"string"}},"title":"Category","x-readme-ref-name":"Category"} as const
;
const FindPetsByStatus = {"metadata":{"allOf":[{"type":"object","properties":{"status":{"type":"array","items":{"type":"string","enum":["available","pending","sold"],"default":"available","description":"Default: available"},"$schema":"http://json-schema.org/draft-04/schema#","description":"Status values that need to be considered for filter"}},"required":["status"]}]},"response":{"200":{"type":"array","items":Pet,"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
const Pet = {"type":"object","required":["name","photoUrls"],"properties":{"id":{"type":"integer","format":"int64","readOnly":true,"default":40,"examples":[25],"minimum":-9223372036854776000,"maximum":9223372036854776000},"category":Category,"name":{"type":"string","examples":["doggie"]},"photoUrls":{"type":"array","items":{"type":"string","examples":["https://example.com/photo.png"]}},"tags":{"type":"array","items":Tag},"status":{"type":"string","description":"pet status in the store\n\n`available` `pending` `sold`","enum":["available","pending","sold"]}},"title":"Pet","x-readme-ref-name":"Pet"} as const
;
const Tag = {"type":"object","properties":{"id":{"type":"integer","format":"int64","minimum":-9223372036854776000,"maximum":9223372036854776000},"name":{"type":"string"}},"title":"Tag","x-readme-ref-name":"Tag"} as const
;
export { Category, FindPetsByStatus, Pet, Tag }
