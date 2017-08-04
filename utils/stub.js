const api = require('api');

/*
 * <<action>>: Edit the description of your service here
 *
 * In Build, the comments (including this one!) matter. Like javadoc,
 * these comments will be used to generate documentation, as well
 * inform Build about various aspects of your service.
 *
 * You can view the full docs for our documentation format at:
 * https://docs.readme.build/docs/writing-documentation
 *
 * @param {string} name Name of the person
 * @throws {ValidationError} Must provide all required fields
 * @returns {string} A very friendly greeting
 */
api.create('<<action>>', (data, api) => {
  if (!data.name) return api.error('ValidationError');
  api.success('Hey there ' + data.name + '! It worked!\n\nNow edit <<name>>.js to write your own code!');
});
