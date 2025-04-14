import IpListEntry from './IpListEntry.js';

const GetOutboundIPs = {
  "response": {
    "200": {
      "type": "array",
      "items": IpListEntry,
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetOutboundIPs
