const VideoReleaseFormat = {
  "type": "string",
  "description": "Video release format\n\n`SUPER_8` `BETAMAX` `VHS` `CED` `LD` `VHD` `VCD` `VIDEO_8` `DVD` `UMD` `HD_DVD` `BLU_RAY` `BLU_RAY_4K_UHD` `DIGITAL_FORMAT`",
  "enum": [
    "SUPER_8",
    "BETAMAX",
    "VHS",
    "CED",
    "LD",
    "VHD",
    "VCD",
    "VIDEO_8",
    "DVD",
    "UMD",
    "HD_DVD",
    "BLU_RAY",
    "BLU_RAY_4K_UHD",
    "DIGITAL_FORMAT"
  ],
  "title": "VideoReleaseFormat",
  "x-readme-ref-name": "VideoReleaseFormat"
} as const;
export default VideoReleaseFormat
