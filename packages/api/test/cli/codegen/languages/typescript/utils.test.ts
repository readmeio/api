import { docblockEscape, generateTypeName, wordWrap } from '../../../../../src/cli/codegen/languages/typescript/util';

describe('ts codegen utils', () => {
  describe('#docblockEscape', () => {
    it('should not touch a safe string', () => {
      expect(docblockEscape('This is a short sentence.')).toBe('This is a short sentence.');
    });

    it('should escape an unsafe docblock', () => {
      expect(docblockEscape('/* this in a docblock will break a JS file */')).toBe(
        '/\\* this in a docblock will break a JS file *\\/'
      );

      expect(docblockEscape('/** this in a docblock will break a JS file **/')).toBe(
        '/\\** this in a docblock will break a JS file **\\/'
      );

      expect(docblockEscape('**/myfiles/some_folder**')).toBe('**\\/myfiles/some_folder**');
    });
  });

  describe('#generateTypeName', () => {
    it('should generate safe names', () => {
      expect(generateTypeName('a')).toBe('A');
      expect(generateTypeName('abc')).toBe('Abc');
      expect(generateTypeName('ABcd')).toBe('ABcd');
      expect(generateTypeName('$Abc_123')).toBe('Abc123');
      expect(generateTypeName('123_$Abc')).toBe('$123Abc');
      expect(generateTypeName('Abc-de-f')).toBe('AbcDeF');
    });

    it('should generate a safe name from the string to constant work we have in codegen for $ref pointers', () => {
      expect(generateTypeName('::convert::Pet')).toBe('ConvertPet');
    });

    it('should sanitize reserved words', () => {
      expect(generateTypeName('const')).toBe('$Const');
      expect(generateTypeName('delete')).toBe('$Delete');
      expect(generateTypeName('let')).toBe('$Let');
      expect(generateTypeName('new')).toBe('$New');
    });
  });

  describe('#wordwrap', () => {
    it('should not touch a short string', () => {
      expect(wordWrap('This is a short sentence.')).toBe('This is a short sentence.');
    });

    it('should wrap a long string', () => {
      expect(
        wordWrap(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat ante sed porta viverra. Sed sagittis urna odio, id tempus massa facilisis non. Fusce a elit ante. Sed non velit at sapien posuere semper'
        )
      ).toBe(
        [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat ante sed porta',
          'viverra. Sed sagittis urna odio, id tempus massa facilisis non. Fusce a elit ante. Sed',
          'non velit at sapien posuere semper',
        ].join('\n')
      );
    });
  });
});
