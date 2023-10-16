import BookSeriesBase from './BookSeriesBase';
import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';

const BookSeriesBaseResponse = {"type":"object","description":"Response object for book series search","properties":{"page":ResponsePage,"sort":ResponseSort,"bookSeries":{"type":"array","description":"List of book series matching given criteria","items":BookSeriesBase}},"title":"BookSeriesBaseResponse","x-readme-ref-name":"BookSeriesBaseResponse"} as const
;
export default BookSeriesBaseResponse
