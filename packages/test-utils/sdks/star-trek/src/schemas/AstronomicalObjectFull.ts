import AstronomicalObjectBase from './AstronomicalObjectBase';
import AstronomicalObjectBase from './AstronomicalObjectBase';
import AstronomicalObjectType from './AstronomicalObjectType';

const AstronomicalObjectFull = {"type":"object","description":"Full astronomical object, returned when queried using UID","properties":{"uid":{"type":"string","description":"Astronomical object's unique ID"},"name":{"type":"string","description":"Astronomical object name"},"astronomicalObjectType":AstronomicalObjectType,"location":AstronomicalObjectBase,"astronomicalObjects":{"type":"array","description":"Astronomical objects located in this astronomical object, like planets in a star system","items":AstronomicalObjectBase}},"required":["uid","name","astronomicalObjectType"],"title":"AstronomicalObjectFull","x-readme-ref-name":"AstronomicalObjectFull"} as const
;
export default AstronomicalObjectFull
