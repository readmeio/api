import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import TradingCardBase from './TradingCardBase';

const TradingCardBaseResponse = {"type":"object","description":"Response object for trading cards search","properties":{"page":ResponsePage,"sort":ResponseSort,"tradingCards":{"type":"array","description":"List of trading cards matching given criteria","items":TradingCardBase}},"title":"TradingCardBaseResponse","x-readme-ref-name":"TradingCardBaseResponse"} as const
;
export default TradingCardBaseResponse
