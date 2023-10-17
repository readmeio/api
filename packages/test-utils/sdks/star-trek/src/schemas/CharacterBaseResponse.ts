import CharacterBase from './CharacterBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const CharacterBaseResponse = {"type":"object","description":"Response object for characters search","properties":{"page":ResponsePage,"sort":ResponseSort,"characters":{"type":"array","description":"List of characters matching given criteria","items":CharacterBase}},"title":"CharacterBaseResponse","x-readme-ref-name":"CharacterBaseResponse"} as const
;
export default CharacterBaseResponse
