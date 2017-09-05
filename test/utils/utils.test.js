const assert = require('assert');

const utils = require('../../utils/utils');

describe('utils', () => {
  describe('#getUnchangedDocs', () => {
    it('Return with an empty array if docs changed', () => {
      const docs = [{ name: 'helloWorld' }];
      const unchanged = utils.getUnchangedDocs(docs);
      assert(unchanged, []);
    });

    it('Should return with action name if unchanged', () => {
      const defaultDocs = [{
        name: 'helloWorld',
        description: 'Edit the description of your service here',
        fullDescription: 'THESE COMMENTS ARE YOUR DOCUMENTATION! You can view the full docs for our documentation format at: https://docs.readme.build/docs/writing-documentation Write a description and define your API in this code block.',
        returns: { description: 'A very friendly greeting', type: 'string' },
      }];
      const unchanged = utils.getUnchangedDocs(defaultDocs);
      assert(unchanged, ['helloWorld']);
    });
  });
});
