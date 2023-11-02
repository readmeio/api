import TradingCardFull from './TradingCardFull.js';

const TradingCardFullResponse = {
  "type": "object",
  "description": "Response object for single trading card query",
  "properties": {
    "tradingCard": TradingCardFull
  },
  "title": "TradingCardFullResponse",
  "x-readme-ref-name": "TradingCardFullResponse"
} as const;
export default TradingCardFullResponse
