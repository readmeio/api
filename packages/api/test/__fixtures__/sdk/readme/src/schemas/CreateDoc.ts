import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';

const CreateDoc = {"metadata":{"allOf":[{"type":"object","properties":{"x-readme-version":{"type":"string","examples":["v3.0"],"$schema":"http://json-schema.org/draft-04/schema#","description":"Version number of your docs project, for example, v3.0. By default the main project version is used. To see all valid versions for your docs project call https://docs.readme.com/main/reference/version#getversions."}},"required":[]}]},"response":{"401":{"oneOf":[ErrorApikeyEmpty,ErrorApikeyNotfound],"$schema":"http://json-schema.org/draft-04/schema#"},"403":{"oneOf":[ErrorApikeyMismatch],"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default CreateDoc
