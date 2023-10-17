import CompanyBase from './CompanyBase';
import Reference from './Reference';
import StaffBase from './StaffBase';

const SoundtrackFull = {"type":"object","description":"Full soundtrack, returned when queried using UID","properties":{"uid":{"type":"string","description":"Soundtrack unique ID"},"title":{"type":"string","description":"Soundtrack title"},"releaseDate":{"type":"string","description":"Release date","format":"date"},"length":{"type":"integer","description":"Length, in seconds"},"labels":{"type":"array","description":"Labels this soundtrack was relesed by","items":CompanyBase},"composers":{"type":"array","description":"Composers","items":StaffBase},"contributors":{"type":"array","description":"Other musicians that contributed to this soundtrack","items":StaffBase},"orchestrators":{"type":"array","description":"Orchestrators","items":StaffBase},"references":{"type":"array","description":"References","items":Reference}},"required":["uid","title"],"title":"SoundtrackFull","x-readme-ref-name":"SoundtrackFull"} as const
;
export default SoundtrackFull
