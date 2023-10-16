import Vehicle from './Vehicle';

const GetNextripVehiclesRouteId = {"metadata":{"allOf":[{"type":"object","properties":{"route_id":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#"}},"required":["route_id"]}]},"response":{"200":{"type":"array","items":Vehicle,"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default GetNextripVehiclesRouteId
