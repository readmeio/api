import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import TradingCardSetBase from './TradingCardSetBase';

const TradingCardSetBaseResponse = {"type":"object","description":"Response object for trading card sets search","properties":{"page":ResponsePage,"sort":ResponseSort,"tradingCardSets":{"type":"array","description":"List of trading card sets matching given criteria","items":TradingCardSetBase}},"title":"TradingCardSetBaseResponse","x-readme-ref-name":"TradingCardSetBaseResponse"} as const
;
export default TradingCardSetBaseResponse
