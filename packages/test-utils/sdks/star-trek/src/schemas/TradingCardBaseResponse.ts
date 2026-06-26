import ResponsePage from './ResponsePage.js';
import ResponseSort from './ResponseSort.js';
import TradingCardBase from './TradingCardBase.js';

const TradingCardBaseResponse = {
  "type": "object",
  "description": "Response object for trading cards search",
  "properties": {
    "page": ResponsePage,
    "sort": ResponseSort,
    "tradingCards": {
      "type": "array",
      "description": "List of trading cards matching given criteria",
      "items": TradingCardBase
    }
  },
  "title": "TradingCardBaseResponse",
  "x-readme-ref-name": "TradingCardBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TradingCardBaseResponse
