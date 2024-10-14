import User from './User.js';

const CreateUsersWithArrayInput = {
  "body": {
    "type": "array",
    "items": User,
    "$schema": "http://json-schema.org/draft-04/schema#"
  }
} as const;
export default CreateUsersWithArrayInput
