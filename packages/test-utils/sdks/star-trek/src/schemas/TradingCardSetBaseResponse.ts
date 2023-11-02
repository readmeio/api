import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import TradingCardSetBase from './TradingCardSetBase.js';

const TradingCardSetBaseResponse = {
  "type": "object",
  "description": "Response object for trading card sets search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "tradingCardSets": {
      "type": "array",
      "description": "List of trading card sets matching given criteria",
      "items": TradingCardSetBase
    }
  },
  "title": "TradingCardSetBaseResponse",
  "x-readme-ref-name": "TradingCardSetBaseResponse"
} as const;
export default TradingCardSetBaseResponse
