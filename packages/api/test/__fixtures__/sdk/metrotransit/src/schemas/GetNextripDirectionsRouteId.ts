import Direction from './Direction';

const GetNextripDirectionsRouteId = {"metadata":{"allOf":[{"type":"object","properties":{"route_id":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#"}},"required":["route_id"]}]},"response":{"200":{"type":"array","items":Direction,"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default GetNextripDirectionsRouteId
