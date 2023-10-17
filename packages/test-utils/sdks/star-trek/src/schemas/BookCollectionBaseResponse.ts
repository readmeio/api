import BookCollectionBase from './BookCollectionBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const BookCollectionBaseResponse = {"type":"object","description":"Response object for book collections search","properties":{"page":ResponsePage,"sort":ResponseSort,"bookCollections":{"type":"array","description":"List of book collections matching given criteria","items":BookCollectionBase}},"title":"BookCollectionBaseResponse","x-readme-ref-name":"BookCollectionBaseResponse"} as const
;
export default BookCollectionBaseResponse
