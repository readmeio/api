import User from './User.js';

const CreateUsersWithListInput = {
  "body": {
    "type": "array",
    "items": User,
    "$schema": "http://json-schema.org/draft-04/schema#"
  }
} as const;
export default CreateUsersWithListInput
