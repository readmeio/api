import TradingCardDeckBase from './TradingCardDeckBase';
import TradingCardSetBase from './TradingCardSetBase';

const TradingCardFull = {"type":"object","description":"Full trading card, returned when queried using UID","properties":{"uid":{"type":"string","description":"Trading card unique ID"},"name":{"type":"string","description":"Trading card name"},"tradingCardSet":TradingCardSetBase,"tradingCardDeck":TradingCardDeckBase,"number":{"type":"string","description":"Trading card number"},"releaseYear":{"type":"integer","description":"Release year, if set was releases over multiple years"},"productionRun":{"type":"integer","description":"Production run, if different from trading card set production run"}},"required":["uid","name"],"title":"TradingCardFull","x-readme-ref-name":"TradingCardFull"} as const
;
export default TradingCardFull
