'use strict';

const assert = require('assert');

const tests = shortenStack => {
  const dir = process.cwd();

  const empty = shortenStack(dir, '');
  assert.equal(empty, '');

  const error = new Error('Test error');
  const { stack } = error;
  const short = shortenStack(dir, stack);

  assert(error instanceof Error);
  assert(typeof short === 'string');
  assert(typeof stack === 'string');
  assert(stack.includes(dir));
  assert(!short.includes(dir));
  assert.equal(stack[0], short[0]);
  assert.equal(stack.split('\n').length, short.split('\n').length);

  const notInc = shortenStack('/unknown/path', stack);
  assert.equal(notInc, stack);

  const nmStack = `Error: Test error
    at tests (/home/marcus/Refactoring/node_modules/module_name/index.js:6:17)
    at Object.<anonymous> (/home/marcus/Refactoring/3-run.js:5:1)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)`;
  const nmShort = shortenStack('/home/marcus/Refactoring', nmStack);
  const nmExpected = `Error: Test error
    at tests (/module_name/index.js:6:17)
    at Object.<anonymous> (/3-run.js:5:1)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)`;
  assert.equal(nmShort, nmExpected);
};

module.exports = { tests };
