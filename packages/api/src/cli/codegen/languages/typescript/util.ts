import camelCase from 'lodash.camelcase';
import deburr from 'lodash.deburr';
import startCase from 'lodash.startcase';
import { format as prettier } from 'prettier';

/**
 * This is a mix of reserved JS words and keywords in TypeScript that might be reserved or
 * allowable but functionally confusing (like `let any = 'buster';`)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar}
 */
const RESERVED_WORDS = [
  'abstract',
  'any',
  'arguments',
  'as',
  'async',
  'await',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'constructor',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'from',
  'function',
  'get',
  'goto',
  'if',
  'implements',
  'import',
  'interface',
  'in',
  'instanceof',
  'int',
  'let',
  'long',
  'native',
  'new',
  'null',
  'number',
  'of',
  'package',
  'private',
  'protected',
  'public',
  'module',
  'namespace',
  'return',
  'set',
  'short',
  'static',
  'string',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'type',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'volatile',
  'yield',

  // These aren't reserved keywords but because we maybe codegen'ing an SDK to be used in the
  // browser it'd be very bad if we overwrote these. This obviously doesn't account for browser APIs
  // you can access outside of the `Window` API (like `alert()`), but we can add checks for those
  // later if we need to.
  'frames',
  'global',
  'globalThis',
  'navigator',
  'self',
  'window',
];

export function formatter(content: string) {
  return prettier(content, {
    parser: 'typescript',
    printWidth: 100,
    singleQuote: true,
  });
}

/**
 * @see {@link https://www.30secondsofcode.org/js/s/word-wrap}
 */
export function wordWrap(str: string, max = 88) {
  return str.replace(new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), '$1\n');
}

/**
 * Safely escape some string characters that may break a docblock.
 *
 */
export function docblockEscape(str: string) {
  return str.replace(/\/\*/g, '/\\*').replace(/\*\//g, '*\\/');
}

/**
 * Convert a string that might contain spaces or special characters to one that can safely be used
 * as a TypeScript interface or enum name.
 *
 * This function has been adapted and slighty modified from `json-schema-to-typescript`.
 *
 * @license MIT
 * @see {@link https://github.com/bcherny/json-schema-to-typescript}
 */
export function toSafeString(str: string) {
  // identifiers in javaScript/ts:
  // First character: a-zA-Z | _ | $
  // Rest: a-zA-Z | _ | $ | 0-9

  // remove accents, umlauts, ... by their basic latin letters
  return (
    deburr(str)
      // if the string starts with a number, prefix it with character that typescript can accept
      // https://github.com/bcherny/json-schema-to-typescript/issues/489
      .replace(/^(\d){1}/, '$$1')
      // replace chars which are not valid for typescript identifiers with whitespace
      .replace(/(^\s*[^a-zA-Z_$])|([^a-zA-Z_$\d])/g, ' ')
      // uppercase leading underscores followed by lowercase
      .replace(/^_[a-z]/g, (match: string) => match.toUpperCase())
      // remove non-leading underscores followed by lowercase (convert snake_case)
      .replace(/_[a-z]/g, (match: string) => match.substr(1, match.length).toUpperCase())
      // uppercase letters after digits, dollars
      .replace(/([\d$]+[a-zA-Z])/g, (match: string) => match.toUpperCase())
      // uppercase first letter after whitespace
      .replace(/\s+([a-zA-Z])/g, (match: string) => match.toUpperCase().trim())
      // remove remaining whitespace
      .replace(/\s/g, '')
  );
}

export function generateTypeName(...parts: string[]) {
  let str;

  // If the end of our string ends with something like `2XX`, the combination of `startCase` and
  // `camelCase` will transform it into `2Xx`.
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    if (last.match(/^(\d)XX$/)) {
      str = startCase(camelCase(parts.slice(0, -1).join(' ')));
      str += ` ${last}`;
    }
  }

  if (!str) {
    str = startCase(camelCase(parts.join(' ')));
  }

  if (RESERVED_WORDS.includes(str.toLowerCase())) {
    str = `$${str}`;
  }

  return toSafeString(str);
}
