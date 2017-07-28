const api = require('api');

/*
 * <<action>>: Add a one line description of your service here
 *
 * Add a longer description of your service here. This can be as
 * long as you need it to be and also be on multiple lines.
 *
 * @param {string} name Name of the person
 * @throws {ValidationError} Must provide all required fields
 * @returns {string} A very friendly greeting
 */
api.create('<<action>>', (data, api) => {
  if (!data.name) return api.error('ValidationError');
  api.success('Hey there ' + data.name + '! It worked!\n\nNow edit <<name>>.js to write your own code!');
});
