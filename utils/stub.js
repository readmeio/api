const api = require('api-build');

api.create('<<action>>', (data, api) => {
  api.success('Hey there! It worked!');
});