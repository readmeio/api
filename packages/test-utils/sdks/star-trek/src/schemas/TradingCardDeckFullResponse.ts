import TradingCardDeckFull from './TradingCardDeckFull';

const TradingCardDeckFullResponse = {
  "type": "object",
  "description": "Response object for single trading card deck query",
  "properties": {
    "tradingCardDeck": TradingCardDeckFull
  },
  "title": "TradingCardDeckFullResponse",
  "x-readme-ref-name": "TradingCardDeckFullResponse"
} as const;
export default TradingCardDeckFullResponse
