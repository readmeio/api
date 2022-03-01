/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import fs from 'fs';
import ts, { factory } from 'typescript';

ts.parseIsolatedEntityName;
type KeywordTypeName = 'any' | 'number' | 'object' | 'string' | 'boolean' | 'undefined' | 'null';

export const questionToken = factory.createToken(ts.SyntaxKind.QuestionToken);

export function createQuestionToken(token?: boolean | ts.QuestionToken) {
  if (!token) return undefined;
  if (token === true) return questionToken;
  return token;
}

export function createKeywordType(type: KeywordTypeName) {
  switch (type) {
    case 'any':
      return factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    case 'number':
      return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    case 'object':
      return factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword);
    case 'string':
      return factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case 'boolean':
      return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    case 'undefined':
      return factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
    case 'null':
      return factory.createLiteralTypeNode(ts.factory.createToken(ts.SyntaxKind.NullKeyword));
  }
}

export const keywordType: {
  [type: string]: ts.KeywordTypeNode | ts.LiteralTypeNode;
} = {
  any: factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
  number: factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
  object: factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword),
  string: factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
  boolean: factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
  undefined: factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
  null: factory.createLiteralTypeNode(ts.factory.createToken(ts.SyntaxKind.NullKeyword)),
};

export const modifier = {
  async: factory.createModifier(ts.SyntaxKind.AsyncKeyword),
  export: factory.createModifier(ts.SyntaxKind.ExportKeyword),
};

export function createTypeAliasDeclaration({
  decorators,
  modifiers,
  name,
  typeParameters,
  type,
}: {
  decorators?: ts.Decorator[];
  modifiers?: ts.Modifier[];
  name: string | ts.Identifier;
  typeParameters?: ts.TypeParameterDeclaration[];
  type: ts.TypeNode;
}) {
  return factory.createTypeAliasDeclaration(decorators, modifiers, name, typeParameters, type);
}

export function toExpression(ex: ts.Expression | string) {
  if (typeof ex === 'string') return factory.createIdentifier(ex);
  return ex;
}

export function createCall(
  expression: ts.Expression | string,
  {
    typeArgs,
    args,
  }: {
    typeArgs?: ts.TypeNode[];
    args?: ts.Expression[];
  } = {}
) {
  return factory.createCallExpression(toExpression(expression), typeArgs, args);
}

export function createMethodCall(
  method: string,
  opts: {
    typeArgs?: ts.TypeNode[];
    args?: ts.Expression[];
  }
) {
  return createCall(factory.createPropertyAccessExpression(factory.createThis(), method), opts);
}

export function createObjectLiteral(props: [string, string | ts.Expression][]) {
  return factory.createObjectLiteralExpression(
    props.map(([name, identifier]) => createPropertyAssignment(name, toExpression(identifier))),
    true
  );
}

export function createPropertyAssignment(name: string, expression: ts.Expression) {
  if (ts.isIdentifier(expression)) {
    if (expression.text === name) {
      return factory.createShorthandPropertyAssignment(name);
    }
  }
  return factory.createPropertyAssignment(propertyName(name), expression);
}

export function block(...statements: ts.Statement[]) {
  return factory.createBlock(statements, true);
}

export function createArrowFunction(
  parameters: ts.ParameterDeclaration[],
  body: ts.ConciseBody,
  {
    modifiers,
    typeParameters,
    type,
    equalsGreaterThanToken,
  }: {
    modifiers?: ts.Modifier[];
    typeParameters?: ts.TypeParameterDeclaration[];
    type?: ts.TypeNode;
    equalsGreaterThanToken?: ts.EqualsGreaterThanToken;
  } = {}
) {
  return factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body);
}

export function createFunctionDeclaration(
  name: string | ts.Identifier | undefined,
  {
    decorators,
    modifiers,
    asteriskToken,
    typeParameters,
    type,
  }: {
    decorators?: ts.Decorator[];
    modifiers?: ts.Modifier[];
    asteriskToken?: ts.AsteriskToken;
    typeParameters?: ts.TypeParameterDeclaration[];
    type?: ts.TypeNode;
  },
  parameters: ts.ParameterDeclaration[],
  body?: ts.Block
): ts.FunctionDeclaration {
  return factory.createFunctionDeclaration(
    decorators,
    modifiers,
    asteriskToken,
    name,
    typeParameters,
    parameters,
    type,
    body
  );
}

export function createClassDeclaration({
  decorators,
  modifiers,
  name,
  typeParameters,
  heritageClauses,
  members,
}: {
  decorators?: ts.Decorator[];
  modifiers?: ts.Modifier[];
  name?: string | ts.Identifier;
  typeParameters?: ts.TypeParameterDeclaration[];
  heritageClauses?: ts.HeritageClause[];
  members: ts.ClassElement[];
}) {
  return factory.createClassDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members);
}

export function createConstructor({
  decorators,
  modifiers,
  parameters,
  body,
}: {
  decorators?: ts.Decorator[];
  modifiers?: ts.Modifier[];
  parameters: ts.ParameterDeclaration[];
  body?: ts.Block;
}) {
  return factory.createConstructorDeclaration(decorators, modifiers, parameters, body);
}

export function createMethod(
  name: string | ts.Identifier | ts.StringLiteral | ts.NumericLiteral | ts.ComputedPropertyName,
  {
    decorators,
    modifiers,
    asteriskToken,
    questionToken,
    typeParameters,
    type,
  }: {
    decorators?: ts.Decorator[];
    modifiers?: ts.Modifier[];
    asteriskToken?: ts.AsteriskToken;
    questionToken?: ts.QuestionToken | boolean;
    typeParameters?: ts.TypeParameterDeclaration[];
    type?: ts.TypeNode;
  } = {},
  parameters: ts.ParameterDeclaration[] = [],
  body?: ts.Block
): ts.MethodDeclaration {
  return factory.createMethodDeclaration(
    decorators,
    modifiers,
    asteriskToken,
    name,
    createQuestionToken(questionToken),
    typeParameters,
    parameters,
    type,
    body
  );
}

export function createParameter(
  name: string | ts.BindingName,
  {
    decorators,
    modifiers,
    dotDotDotToken,
    questionToken,
    type,
    initializer,
  }: {
    decorators?: ts.Decorator[];
    modifiers?: ts.Modifier[];
    dotDotDotToken?: ts.DotDotDotToken;
    questionToken?: ts.QuestionToken | boolean;
    type?: ts.TypeNode;
    initializer?: ts.Expression;
  }
): ts.ParameterDeclaration {
  return factory.createParameterDeclaration(
    decorators,
    modifiers,
    dotDotDotToken,
    name,
    createQuestionToken(questionToken),
    type,
    initializer
  );
}

function propertyName(name: string | ts.PropertyName): ts.PropertyName {
  if (typeof name === 'string') {
    return isValidIdentifier(name) ? factory.createIdentifier(name) : factory.createStringLiteral(name);
  }
  return name;
}

export function createPropertySignature({
  modifiers,
  name,
  questionToken,
  type,
}: {
  modifiers?: ts.Modifier[];
  name: ts.PropertyName | string;
  questionToken?: ts.QuestionToken | boolean;
  type?: ts.TypeNode;
}) {
  return factory.createPropertySignature(modifiers, propertyName(name), createQuestionToken(questionToken), type);
}

export function createIndexSignature(
  type: ts.TypeNode,
  {
    decorators,
    modifiers,
    indexName = 'key',
    indexType = keywordType.string,
  }: {
    indexName?: string;
    indexType?: ts.TypeNode;
    decorators?: ts.Decorator[];
    modifiers?: ts.Modifier[];
  } = {}
) {
  return factory.createIndexSignature(decorators, modifiers, [createParameter(indexName, { type: indexType })], type);
}

export function createObjectBinding(
  elements: {
    name: string | ts.BindingName;
    dotDotDotToken?: ts.DotDotDotToken;
    propertyName?: string | ts.PropertyName;
    initializer?: ts.Expression;
  }[]
) {
  return factory.createObjectBindingPattern(
    elements.map(({ dotDotDotToken, propertyName, name, initializer }) =>
      factory.createBindingElement(dotDotDotToken, propertyName, name, initializer)
    )
  );
}

export function createTemplateString(head: string, spans: { literal: string; expression: ts.Expression }[]) {
  if (!spans.length) return factory.createStringLiteral(head);
  return factory.createTemplateExpression(
    factory.createTemplateHead(head),
    spans.map(({ expression, literal }, i) =>
      factory.createTemplateSpan(
        expression,
        i === spans.length - 1 ? factory.createTemplateTail(literal) : factory.createTemplateMiddle(literal)
      )
    )
  );
}

export function findNode<T extends ts.Node>(
  nodes: ts.NodeArray<ts.Node>,
  kind: T extends { kind: infer K } ? K : never,
  test?: (node: T) => boolean | undefined
): T {
  const node = nodes.find(s => s.kind === kind && (!test || test(s as T))) as T;
  if (!node) throw new Error(`Node not found: ${kind}`);
  return node;
}

export function getName(name: ts.Node) {
  if (ts.isIdentifier(name)) {
    return name.escapedText;
  }
  if (ts.isLiteralExpression(name)) {
    return name.text;
  }
  return '';
}

export function getFirstDeclarationName(n: ts.VariableStatement) {
  const name = ts.getNameOfDeclaration(n.declarationList.declarations[0]);
  return name ? getName(name) : '';
}

export function findFirstVariableDeclaration(nodes: ts.NodeArray<ts.Node>, name: string) {
  const statement = findNode<ts.VariableStatement>(
    nodes,
    ts.SyntaxKind.VariableStatement,
    n => getFirstDeclarationName(n) === name
  );
  const [first] = statement.declarationList.declarations;
  if (!first) throw new Error('Missing declaration');
  return first;
}

export function changePropertyValue(o: ts.ObjectLiteralExpression, property: string, value: ts.Expression) {
  const p = o.properties.find(p => ts.isPropertyAssignment(p) && getName(p.name) === property);
  if (p && ts.isPropertyAssignment(p)) {
    // p.initializer is readonly, this might break in a future TS version, but works fine for now.
    Object.assign(p, { initializer: value });
  } else {
    throw new Error(`No such property: ${property}`);
  }
}

export function appendNodes<T extends ts.Node>(array: ts.NodeArray<T>, ...nodes: T[]) {
  return factory.createNodeArray([...array, ...nodes]);
}

export function addComment<T extends ts.Node>(node: T, comment?: string) {
  if (!comment) return node;
  return ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*\n * ${comment.replace(/\n/g, '\n * ')}\n `,
    true
  );
}

export function parseFile(file: string) {
  return ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    /* setParentNodes */ false,
    ts.ScriptKind.TS
  );
}

const printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
});

export function printNode(node: ts.Node) {
  const file = ts.createSourceFile(
    'someFileName.ts',
    '',
    ts.ScriptTarget.Latest,
    /* setParentNodes */ false,
    ts.ScriptKind.TS
  );
  return printer.printNode(ts.EmitHint.Unspecified, node, file);
}

export function printNodes(nodes: ts.Node[]) {
  const file = ts.createSourceFile(
    'someFileName.ts',
    '',
    ts.ScriptTarget.Latest,
    /* setParentNodes */ false,
    ts.ScriptKind.TS
  );

  return nodes.map(node => printer.printNode(ts.EmitHint.Unspecified, node, file)).join('\n');
}

export function printFile(sourceFile: ts.SourceFile) {
  return printer.printFile(sourceFile);
}

export function isValidIdentifier(str: string) {
  if (!str.length || str.trim() !== str) return false;
  const node = ts.parseIsolatedEntityName(str, ts.ScriptTarget.Latest);
  return !!node && node.kind === ts.SyntaxKind.Identifier && node.originalKeywordKind === undefined;
}
