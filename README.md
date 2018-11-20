# curry-arity

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mdjermanovic/curry-arity/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/curry-arity.svg?style=flat)](https://www.npmjs.com/package/curry-arity) [![Build Status](https://travis-ci.org/mdjermanovic/curry-arity.svg?branch=master)](https://travis-ci.org/mdjermanovic/curry-arity) [![Coverage Status](https://coveralls.io/repos/github/mdjermanovic/curry-arity/badge.svg?branch=master)](https://coveralls.io/github/mdjermanovic/curry-arity?branch=master)

Simple, tiny curry() and curryN() functions. 

Both can take functions of _any arity_, there are no limits. 

Resulting functions will always have the correct arity (`length` property).

This library does not use eval(), new Function() or any dynamic code evaluation.

## Examples

```js
const f = (a, b, c) => a + b + c;

const add = curry(f);

add.length; // 3
add(10).length; // 2
add(10)(20).length; // 1

add(10)(20)(30); // 60
add(10, 20)(30); // 60
add(10)(20, 30); // 60
add(10, 20, 30); // 60

/* reusable */
const addTen = add(10); 
addTen(20)(30); // 60
addTen(40)(50); // 100
```

Only the parameters before the first one with a default value are counted:

```js
const add = curry((a, b, c = 30) => a + b + c);

add.length; // 2
add(10)(20); // 60
// add(10)(20)(70) would throw TypeError

/* you can pass additional arguments in the final call */
add(10)(20, 70); // 100
```

You can also specify arity using `curryN()` instead of `curry()`:

```js
const add = curryN(3, (a, b, c = 30) => a + b + c);

add.length; // 3
add(10)(20)(70); // 100

/* undefined always triggers the default value */
add(10)(20)(undefined); // 60
```

Another example with `curryN()`:

```js
const add = (...args) => args.reduce((a, b) => a + b);

curryN(2, add).length;  // 2
curryN(2, add)(10)(20); // 30

curryN(3, add).length;  // 3
curryN(3, add)(10)(20)(70); // 100
```

Curried functions also correctly handle implicit `this`:

```js
const obj = {
  a: 10,
  addMe: curry(function (b, c) { return this.a + b + c; })
}  

/* 'this' from the first call (obj.addMe(20)) is always used */
obj.addMe(20)(30); // 60 
```

## How it works

Using `Object.defineProperty()` on created function objects. The original function object is not changed in any way.

By the ES6 specification, `function.length` is _configurable_. It wasn't configurable in ES5.

## Supported Environments

This library will not work in old ES5 browsers, namely IE11. By design, functions will throw if the length cannot be set,
as the correct arity is a part of the API.

The code is not transpiled to ES5, as the ES6 version is more efficient and the library wouldn't work in all ES5 browsers anyway.
So, supported environments are:

* Node >= 6
* Browsers that support basic ES6 syntax

## Installation and Usage

### Node

```console
$ npm install curry-arity
```

```js
const { curry, curryN } = require('curry-arity');

const f = (a, b, c = 30) => a + b + c;

const fc = curry(f);
console.log(fc(10)(20)); // 60

const fc3 = curryN(3, f);
console.log(fc3(10)(20)(70)); // 100
```

### Browser Script

Unminified (~600B):

```html
<script src="https://unpkg.com/curry-arity@1.0.0/dist/curryarity.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/curry-arity@1.0.0/dist/curryarity.js"></script>
```

Minified (~250B):

```html
<script src="https://unpkg.com/curry-arity@1.0.0/dist/curryarity.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/curry-arity@1.0.0/dist/curryarity.min.js"></script>
```

The script creates a global variable `CurryArity`:

```js
const f = (a, b, c = 30) => a + b + c;

const fc = CurryArity.curry(f);
console.log(fc(10)(20)); // 60

const fc3 = CurryArity.curryN(3, f);
console.log(fc3(10)(20)(70)); // 100
```

You can also install the package and take the scripts from the `dist` folder.

### ES Module

```console
$ npm install curry-arity
```

ES module: `./node_modules/curry-arity/src/index.js`

If you are using Webpack, Rollup or any tool that reads from `pkg.module`, then simply:

```js
import { curry, curryN } from 'curry-arity';

const f = (a, b, c = 30) => a + b + c;

const fc = curry(f);
const fc3 = curryN(3, f);
```

and it will use the ES module directly, instead of the CommonJS version.

## API

### curry(f)

Returns curried f, with the original arity.

#### f

Function of any arity.

### curryN(n, f)

Returns curried f, with the specified arity.

#### n

Arity of the resulting function. Should be a non-negative integer.

It can be less, equal or greater than the original arity.

#### f

Function of any arity.

By design, the functions do not validate provided arguments.

## About

### Author

[Milos Djermanovic](https://github.com/mdjermanovic)

### License

[MIT License](https://github.com/mdjermanovic/curry-arity/blob/master/LICENSE)
