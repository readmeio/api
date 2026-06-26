import TradingCardDeckFull from './TradingCardDeckFull.js';

const TradingCardDeckFullResponse = {
  "type": "object",
  "description": "Response object for single trading card deck query",
  "properties": {
    "tradingCardDeck": TradingCardDeckFull
  },
  "title": "TradingCardDeckFullResponse",
  "x-readme-ref-name": "TradingCardDeckFullResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TradingCardDeckFullResponse
