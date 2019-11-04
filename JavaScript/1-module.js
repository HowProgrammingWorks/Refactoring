'use strict';

const path = require('path');

const shortenStack = (dir, stack) => {
  if (!stack) return '';
  if (stack.indexOf(dir) === -1) return stack;
  const nmPath = '/node_modules';
  const result = stack.split(path.resolve(dir))
    .map(line => {
      if (line.startsWith(nmPath)) return line.slice(nmPath.length);
      return line;
    })
    .join('');
  return result;
};

module.exports = { shortenStack };
