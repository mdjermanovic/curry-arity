import { expect } from 'chai';
import { curry, curryN } from '../';

describe('Readme examples', () => {
  it('Example #1', () => {
    const f = (a, b, c) => a + b + c;

    const add = curry(f);

    expect(add.length).to.equal(3);
    expect(add(10).length).to.equal(2);
    expect(add(10)(20).length).to.equal(1);

    expect(add(10)(20)(30)).to.equal(60);
    expect(add(10, 20)(30)).to.equal(60);
    expect(add(10)(20, 30)).to.equal(60);
    expect(add(10, 20, 30)).to.equal(60);

    const addTen = add(10);
    expect(addTen(20)(30)).to.equal(60);
    expect(addTen(40)(50)).to.equal(100);
  });

  it('Example #2', () => {
    const add = curry((a, b, c = 30) => a + b + c);

    expect(add.length).to.equal(2);
    expect(add(10)(20)).to.equal(60);
    expect(() => add(10)(20)(70)).to.throw(TypeError);
    expect(add(10)(20, 70)).to.equal(100);
  });

  it('Example #3', () => {
    const add = curryN(3, (a, b, c = 30) => a + b + c);

    expect(add.length).to.equal(3);
    expect(add(10)(20)(70)).to.equal(100);

    expect(add(10)(20)(undefined)).to.equal(60);
  });

  it('Example #4', () => {
    const add = (...args) => args.reduce((a, b) => a + b);

    expect(curryN(2, add).length).to.equal(2);
    expect(curryN(2, add)(10)(20)).to.equal(30);

    expect(curryN(3, add).length).to.equal(3);
    expect(curryN(3, add)(10)(20)(70)).to.equal(100);
  });

  it('Example #5', () => {
    const obj = {
      a: 10,
      addMe: curry(function(b, c) {
        return this.a + b + c;
      }),
    };

    expect(obj.addMe(20)(30)).to.equal(60);
  });
});
