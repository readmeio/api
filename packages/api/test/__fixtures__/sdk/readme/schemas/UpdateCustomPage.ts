import ErrorApikeyEmpty from './ErrorApikeyEmpty';
import ErrorApikeyMismatch from './ErrorApikeyMismatch';
import ErrorApikeyNotfound from './ErrorApikeyNotfound';

const UpdateCustomPage = {"metadata":{"allOf":[{"type":"object","properties":{"slug":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#","description":"A URL-safe representation of the page title. Slugs must be all lowercase, and replace spaces with hyphens. For example, for the title \"Getting Started\", enter the slug \"getting-started\"."}},"required":["slug"]}]},"response":{"401":{"oneOf":[ErrorApikeyEmpty,ErrorApikeyNotfound],"$schema":"http://json-schema.org/draft-04/schema#"},"403":{"oneOf":[ErrorApikeyMismatch],"$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default UpdateCustomPage
