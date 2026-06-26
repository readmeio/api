import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import TradingCardDeckBase from './TradingCardDeckBase.js';

const TradingCardDeckBaseResponse = {
  "type": "object",
  "description": "Response object for trading card decks search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "tradingCardDecks": {
      "type": "array",
      "description": "List of trading card decks matching given criteria",
      "items": TradingCardDeckBase
    }
  },
  "title": "TradingCardDeckBaseResponse",
  "x-readme-ref-name": "TradingCardDeckBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TradingCardDeckBaseResponse
