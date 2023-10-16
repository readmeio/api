const Stop = {"type":"object","properties":{"stop_id":{"type":"integer","format":"int32","minimum":-2147483648,"maximum":2147483647},"latitude":{"type":"number","format":"double","minimum":-1.7976931348623157e+308,"maximum":1.7976931348623157e+308},"longitude":{"type":"number","format":"double","minimum":-1.7976931348623157e+308,"maximum":1.7976931348623157e+308},"description":{"type":["string","null"]}},"additionalProperties":false,"title":"Stop","x-readme-ref-name":"Stop"} as const
;
export default Stop
