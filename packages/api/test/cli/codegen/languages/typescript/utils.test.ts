import { expect } from 'chai';

import { generateTypeName, wordWrap } from '../../../../../src/cli/codegen/languages/typescript/util';

describe('ts codegen utils', function () {
  describe('#wordwrap', function () {
    it('should not touch a short string', function () {
      expect(wordWrap('This is a short sentence.')).to.equal('This is a short sentence.');
    });

    it('should wrap a long string', function () {
      expect(
        wordWrap(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat ante sed porta viverra. Sed sagittis urna odio, id tempus massa facilisis non. Fusce a elit ante. Sed non velit at sapien posuere semper'
        )
      ).to.equal(
        [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat ante sed porta',
          'viverra. Sed sagittis urna odio, id tempus massa facilisis non. Fusce a elit ante. Sed',
          'non velit at sapien posuere semper',
        ].join('\n')
      );
    });
  });

  describe('#generateTypeName', function () {
    it('should generate safe names', function () {
      expect(generateTypeName('a')).to.equal('A');
      expect(generateTypeName('abc')).to.equal('Abc');
      expect(generateTypeName('ABcd')).to.equal('ABcd');
      expect(generateTypeName('$Abc_123')).to.equal('Abc123');
      expect(generateTypeName('123_$Abc')).to.equal('$123Abc');
      expect(generateTypeName('Abc-de-f')).to.equal('AbcDeF');
    });

    it('should generate a safe name from the string to constant work we have in codegen for $ref pointers', function () {
      expect(generateTypeName('::convert::Pet')).to.equal('ConvertPet');
    });
  });
});
