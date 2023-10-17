import ContentRatingSystem from './ContentRatingSystem';

const ContentRating = {"type":"object","description":"Rating of video release, etc.","properties":{"uid":{"type":"string","description":"Rating unique ID"},"contentRatingSystem":ContentRatingSystem,"rating":{"type":"string","description":"Rating within specified content rating system"}},"title":"ContentRating","x-readme-ref-name":"ContentRating"} as const
;
export default ContentRating
