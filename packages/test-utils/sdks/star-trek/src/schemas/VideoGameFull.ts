import CompanyBase from './CompanyBase';
import CompanyBase from './CompanyBase';
import ContentRating from './ContentRating';
import Genre from './Genre';
import Platform from './Platform';
import Reference from './Reference';

const VideoGameFull = {"type":"object","description":"Full video game, returned when queried using UID","properties":{"uid":{"type":"string","description":"Video game unique ID"},"title":{"type":"string","description":"Video game title"},"releaseDate":{"type":"string","description":"Release date","format":"date"},"stardateFrom":{"type":"number","description":"Starting stardate of video game story","format":"float","minimum":-3.402823669209385e+38,"maximum":3.402823669209385e+38},"stardateTo":{"type":"number","description":"Ending stardate of video game story","format":"float","minimum":-3.402823669209385e+38,"maximum":3.402823669209385e+38},"yearFrom":{"type":"integer","description":"Starting year of video game story"},"yearTo":{"type":"integer","description":"Ending year of video game story"},"systemRequirements":{"type":"string","description":"System requirements"},"publishers":{"type":"array","description":"Publishers","items":CompanyBase},"developers":{"type":"array","description":"Developers","items":CompanyBase},"platforms":{"type":"array","description":"Platforms","items":Platform},"genres":{"type":"array","description":"Genres","items":Genre},"ratings":{"type":"array","description":"Ratings","items":ContentRating},"references":{"type":"array","description":"References","items":Reference}},"required":["uid","title"],"title":"VideoGameFull","x-readme-ref-name":"VideoGameFull"} as const
;
export default VideoGameFull
