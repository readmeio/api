import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';

const GetVersions = {"response":{"401":{"oneOf":[ErrorApikeyEmpty,ErrorApikeyNotfound],"$schema":"http://json-schema.org/draft-04/schema#"},"403":{"oneOf":[ErrorApikeyMismatch],"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default GetVersions
