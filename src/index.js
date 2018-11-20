/**
 * @fileoverview curry-arity library
 * @author Milos Djermanovic <milos.djermanovic@gmail.com> (https://github.com/mdjermanovic)
 */

function curryN(n, f) {
  function curried(...args) {
    if (args.length >= n) return f.apply(this, args);
    return curried.bind(this, ...args);
  }
  Object.defineProperty(curried, 'length', {
    value: n,
  });
  return curried;
}

function curry(f) {
  return curryN(f.length, f);
}

export { curry, curryN };
