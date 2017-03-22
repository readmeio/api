const api = require('api-build');

/*
 * <<action>>: Add a one line description of your service here
 *
 * @param {string} name Name of the person
 * @throws {ValidationError} Must provide all required fields
 * @returns {Object} The created user object
 */
api.create('<<action>>', (data, api) => {
  api.success('Hey there ' + data.name + '! It worked!');
});
