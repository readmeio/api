import ContentLanguage from './ContentLanguage.js';
import ContentRating from './ContentRating.js';
import Reference from './Reference.js';
import SeasonBase from './SeasonBase.js';
import SeriesBase from './SeriesBase.js';
import VideoReleaseFormat from './VideoReleaseFormat.js';

const VideoReleaseFull = {
  "type": "object",
  "description": "Full video release, returned when queried using UID",
  "properties": {
    "uid": {
      "type": "string",
      "description": "Video release unique ID"
    },
    "title": {
      "type": "string",
      "description": "Video release title"
    },
    "series": SeriesBase,
    "season": SeasonBase,
    "format": VideoReleaseFormat,
    "numberOfEpisodes": {
      "type": "integer",
      "description": "Number of episodes"
    },
    "numberOfFeatureLengthEpisodes": {
      "type": "integer",
      "description": "Number of feature-length episodes"
    },
    "numberOfDataCarriers": {
      "type": "integer",
      "description": "Number of data carriers (like DVD, VCD, VHS etc.)"
    },
    "runTime": {
      "type": "integer",
      "description": "Run time, in minutes"
    },
    "yearFrom": {
      "type": "integer",
      "description": "Starting year of video release story"
    },
    "yearTo": {
      "type": "integer",
      "description": "Ending year of video release story"
    },
    "regionFreeReleaseDate": {
      "type": "string",
      "description": "Region free release date",
      "format": "date"
    },
    "region1AReleaseDate": {
      "type": "string",
      "description": "Region 1/A release date",
      "format": "date"
    },
    "region1SlimlineReleaseDate": {
      "type": "string",
      "description": "Region 1 slimline release date",
      "format": "date"
    },
    "region2BReleaseDate": {
      "type": "string",
      "description": "Region 2/B release date",
      "format": "date"
    },
    "region2SlimlineReleaseDate": {
      "type": "string",
      "description": "Region 2 slimline release date",
      "format": "date"
    },
    "region4AReleaseDate": {
      "type": "string",
      "description": "Region 4 release date",
      "format": "date"
    },
    "region4SlimlineReleaseDate": {
      "type": "string",
      "description": "Region 4 slimline release date",
      "format": "date"
    },
    "amazonDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on Amazon.com"
    },
    "dailymotionDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on Dailymotion"
    },
    "googlePlayDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on Google Play"
    },
    "iTunesDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on iTunes"
    },
    "ultraVioletDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on UltraViolet"
    },
    "vimeoDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on Vimeo"
    },
    "vuduDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on VUDU"
    },
    "xboxSmartGlassDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on Xbox SmartGlass"
    },
    "youTubeDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on YouTube"
    },
    "netflixDigitalRelease": {
      "type": "boolean",
      "description": "Whether this video has been release on Netflix"
    },
    "references": {
      "type": "array",
      "description": "References",
      "items": Reference
    },
    "ratings": {
      "type": "array",
      "description": "Ratings",
      "items": ContentRating
    },
    "languages": {
      "type": "array",
      "description": "Languages of audio track",
      "items": ContentLanguage
    },
    "languagesSubtitles": {
      "type": "array",
      "description": "Languages of subtitles",
      "items": ContentLanguage
    },
    "languagesDubbed": {
      "type": "array",
      "description": "Languages that are available with dubbing",
      "items": ContentLanguage
    }
  },
  "required": [
    "uid",
    "title"
  ],
  "title": "VideoReleaseFull",
  "x-readme-ref-name": "VideoReleaseFull"
} as const;
export default VideoReleaseFull
