const api = require('api');

/*
 * <<action>>: Edit the description of your service here
 *
 * THESE COMMENTS ARE YOUR DOCUMENTATION!
 * You can view the full docs for our documentation format at:
 * https://docs.readme.build/docs/writing-documentation
 *
 * Write a description and define your API in this
 * code block.
 *
 * @param {string} name=Name Name of the person
 * @throws {ValidationError} Must provide all required fields
 * @returns {string} A very friendly greeting
 */
api.create('<<action>>', (data, api) => {
  if (!data.name) return api.error('ValidationError');
  api.success('Hey there ' + data.name + '! It worked!\n\nNow edit <<name>>.js to write your own code!');
});
