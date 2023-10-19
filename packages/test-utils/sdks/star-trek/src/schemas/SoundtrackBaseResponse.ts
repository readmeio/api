import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import SoundtrackBase from './SoundtrackBase';

const SoundtrackBaseResponse = {
  "type": "object",
  "description": "Response object for soundtracks search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "soundtracks": {
      "type": "array",
      "description": "List of soundtracks matching given criteria",
      "items": SoundtrackBase
    }
  },
  "title": "SoundtrackBaseResponse",
  "x-readme-ref-name": "SoundtrackBaseResponse"
} as const;
export default SoundtrackBaseResponse
