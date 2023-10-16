import OrganizationHeader from './OrganizationHeader';
import OrganizationHeader from './OrganizationHeader';
import SpacecraftClassHeader from './SpacecraftClassHeader';

const SpacecraftBase = {"type":"object","description":"Base spacecraft, returned in search results","properties":{"uid":{"type":"string","description":"Spacecraft unique ID"},"name":{"type":"string","description":"Spacecraft name"},"registry":{"type":"string","description":"Spacecraft registry"},"status":{"type":"string","description":"Status of a spacecraft (in prime reality, if spacecraft was in more than one realities)"},"dateStatus":{"type":"string","description":"Date the spacecraft status was last known"},"spacecraftClass":SpacecraftClassHeader,"owner":OrganizationHeader,"operator":OrganizationHeader},"required":["uid","name"],"title":"SpacecraftBase","x-readme-ref-name":"SpacecraftBase"} as const
;
export default SpacecraftBase
