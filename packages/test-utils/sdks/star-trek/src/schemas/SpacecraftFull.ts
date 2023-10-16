import OrganizationBase from './OrganizationBase';
import OrganizationBase from './OrganizationBase';
import SpacecraftClassBase from './SpacecraftClassBase';
import SpacecraftType from './SpacecraftType';

const SpacecraftFull = {"type":"object","description":"Full spacecraft, returned when queried using UID","properties":{"uid":{"type":"string","description":"Spacecraft unique ID"},"name":{"type":"string","description":"Spacecraft name"},"registry":{"type":"string","description":"Spacecraft registry"},"status":{"type":"string","description":"Status of a spacecraft (in prime reality, if spacecraft was in more than one realities)"},"dateStatus":{"type":"string","description":"Date the spacecraft status was last known"},"spacecraftClass":SpacecraftClassBase,"owner":OrganizationBase,"operator":OrganizationBase,"spacecraftTypes":{"type":"array","description":"Spacecraft types","items":SpacecraftType}},"required":["uid","name"],"title":"SpacecraftFull","x-readme-ref-name":"SpacecraftFull"} as const
;
export default SpacecraftFull
