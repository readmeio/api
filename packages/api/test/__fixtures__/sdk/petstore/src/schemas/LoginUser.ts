const LoginUser = {"metadata":{"allOf":[{"type":"object","properties":{"username":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#","description":"The user name for login"},"password":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#","description":"The password for login in clear text"}},"required":["username","password"]}]},"response":{"200":{"type":"string","$schema":"http://json-schema.org/draft-04/schema#"}}} as const
;
export default LoginUser
