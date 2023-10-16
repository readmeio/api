import ResponsePage from './ResponsePage';
import ResponseSort from './ResponseSort';
import TradingCardDeckBase from './TradingCardDeckBase';

const TradingCardDeckBaseResponse = {"type":"object","description":"Response object for trading card decks search","properties":{"page":ResponsePage,"sort":ResponseSort,"tradingCardDecks":{"type":"array","description":"List of trading card decks matching given criteria","items":TradingCardDeckBase}},"title":"TradingCardDeckBaseResponse","x-readme-ref-name":"TradingCardDeckBaseResponse"} as const
;
export default TradingCardDeckBaseResponse
