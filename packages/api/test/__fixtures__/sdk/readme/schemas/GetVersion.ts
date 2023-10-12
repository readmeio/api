import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';

const GetVersion = {"metadata":{"allOf":[{"type":"object","properties":{"versionId":{"type":"string","examples":["v1.0.0"],"$schema":"http://json-schema.org/draft-04/schema#","description":"Semver identifier for the project version. For best results, use the formatted `version_clean` value listed in the response from the [Get Versions endpoint](/reference/getversions)."}},"required":["versionId"]}]},"response":{"401":{"oneOf":[ErrorApikeyEmpty,ErrorApikeyNotfound],"$schema":"http://json-schema.org/draft-04/schema#"},"403":{"oneOf":[ErrorApikeyMismatch],"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default GetVersion
