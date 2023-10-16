import ComicCollectionBase from './ComicCollectionBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const ComicCollectionBaseResponse = {"type":"object","description":"Response object for comic collections search","properties":{"page":ResponsePage,"sort":ResponseSort,"comicCollections":{"type":"array","description":"List of comic collections matching given criteria","items":ComicCollectionBase}},"title":"ComicCollectionBaseResponse","x-readme-ref-name":"ComicCollectionBaseResponse"} as const
;
export default ComicCollectionBaseResponse
