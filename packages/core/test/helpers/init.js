// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

process.env.TS_NODE_PROJECT = path.resolve('test/tsconfig.json');
process.env.NODE_ENV = 'development';
