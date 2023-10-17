import OrganizationHeader from './OrganizationHeader';
import SpeciesHeader from './SpeciesHeader';

const SpacecraftClassBase = {"type":"object","description":"Base spacecraft class, returned in search results","properties":{"uid":{"type":"string","description":"Spacecraft class unique ID"},"name":{"type":"string","description":"Spacecraft class name"},"numberOfDecks":{"type":"integer","description":"Number of decks"},"warpCapable":{"type":"boolean","description":"Whether it's a warp-capable spacecraft class"},"alternateReality":{"type":"boolean","description":"Whether this spacecraft class is from alternate reality"},"activeFrom":{"type":"string","description":"Starting period when this spacecraft class was in use"},"activeTo":{"type":"string","description":"Ending period when this spacecraft class was in use"},"species":SpeciesHeader,"owner":OrganizationHeader,"operator":OrganizationHeader,"affiliation":OrganizationHeader},"required":["uid","name"],"title":"SpacecraftClassBase","x-readme-ref-name":"SpacecraftClassBase"} as const
;
export default SpacecraftClassBase
