import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import WeaponBase from './WeaponBase';

const WeaponBaseResponse = {"type":"object","description":"Response object for weapons search","properties":{"page":ResponsePage,"sort":ResponseSort,"weapons":{"type":"array","description":"List of weapons matching given criteria","items":WeaponBase}},"title":"WeaponBaseResponse","x-readme-ref-name":"WeaponBaseResponse"} as const
;
export default WeaponBaseResponse
