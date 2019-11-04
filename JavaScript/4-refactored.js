'use strict';

const shortenStack = (dir, stack) => {
  if (!stack) return '';
  if (!stack.includes(dir)) return stack;
  const exp = new RegExp(`${dir}(/node_modules)?`, 'g');
  return stack.replace(exp, '');
};

module.exports = { shortenStack };
