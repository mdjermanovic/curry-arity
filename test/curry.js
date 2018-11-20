import { expect } from 'chai';
import { curry } from '../';

describe('curry(f)', () => {
  describe('If arity of f is 0', () => {
    const f = (...rest) => rest;
    it('Should have length = 0', () => {
      expect(curry(f).length).to.equal(0);
    });
    it('Should just call f if invoked without arguments', () => {
      expect(curry(f)()).to.deep.equal([]);
    });
    it('Should pass arguments', () => {
      expect(curry(f)(10)).to.deep.equal([10]);
      expect(curry(f)(20, 30)).to.deep.equal([20, 30]);
      expect(curry(f)(undefined)).to.deep.equal([undefined]);
    });
    it('Should be a reusable function', () => {
      const fc = curry(f);
      expect(fc()).to.deep.equal([]);
      expect(fc()).to.deep.equal([]);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc(20)).to.deep.equal([20]);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc(30, 40)).to.deep.equal([30, 40]);
      expect(fc(50, 60)).to.deep.equal([50, 60]);
      expect(fc(30, 40)).to.deep.equal([30, 40]);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc(70)).to.deep.equal([70]);
      expect(fc()).to.deep.equal([]);
    });
    it("Should correctly handle 'this'", () => {
      const obj1 = {
        a: 10,
        mc: curry(function() {
          return this.a;
        }),
      };
      expect(obj1.mc()).to.equal(10);

      const extracted = obj1.mc;
      expect(() => extracted()).to.throw(TypeError);

      const obj2 = {
        a: 20,
        mc: extracted,
      };
      expect(obj2.mc()).to.equal(20);
    });
  });

  describe('If arity of f is 1', () => {
    const f = (a, ...rest) => [a, ...rest];
    it('Should have length = 1', () => {
      expect(curry(f).length).to.equal(1);
    });
    it('Should be curried f', () => {
      expect(curry(f)(10)).to.deep.equal([10]);
      expect(curry(f)()(20)).to.deep.equal([20]);
      expect(curry(f)()()(30)).to.deep.equal([30]);
    });
    it('Should return functions that have correct length', () => {
      expect(curry(f)().length).to.equal(1);
      expect(curry(f)()().length).to.equal(1);
    });
    it('Should pass additional arguments', () => {
      expect(curry(f)(10, 20)).to.deep.equal([10, 20]);
      expect(curry(f)()(30, 40, 50)).to.deep.equal([30, 40, 50]);
      expect(curry(f)(60, undefined, undefined)).to.deep.equal([
        60,
        undefined,
        undefined,
      ]);
    });
    it('Should be a reusable function', () => {
      const fc = curry(f);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc(20)).to.deep.equal([20]);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc()(60)).to.deep.equal([60]);
      expect(fc()()(70)).to.deep.equal([70]);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc(30, 40)).to.deep.equal([30, 40]);
      expect(fc(50, 60)).to.deep.equal([50, 60]);
      expect(fc(30, 40)).to.deep.equal([30, 40]);
      expect(fc(70, 80, 90)).to.deep.equal([70, 80, 90]);
      expect(fc(30, 40)).to.deep.equal([30, 40]);
      expect(fc(10)).to.deep.equal([10]);
      expect(fc(70)).to.deep.equal([70]);
      expect(fc(10)).to.deep.equal([10]);
    });
    it('Should return reusable functions', () => {
      const fc_e = curry(f)();
      expect(fc_e(10)).to.deep.equal([10]);
      expect(fc_e(20)).to.deep.equal([20]);
      expect(fc_e(10)).to.deep.equal([10]);
      expect(fc_e()(30)).to.deep.equal([30]);
      expect(fc_e(10)).to.deep.equal([10]);
      expect(fc_e(30, 40)).to.deep.equal([30, 40]);
      expect(fc_e(50, 60)).to.deep.equal([50, 60]);
      expect(fc_e(30, 40)).to.deep.equal([30, 40]);
      expect(fc_e(10)).to.deep.equal([10]);
      expect(fc_e(70)).to.deep.equal([70]);
      expect(fc_e(10)).to.deep.equal([10]);
    });
    it("Should correctly handle 'this'", () => {
      const obj1 = {
        a: 10,
        append: curry(function(b) {
          return [this.a, b];
        }),
      };
      expect(obj1.append(20)).to.deep.equal([10, 20]);

      const extracted = obj1.append;
      expect(() => extracted(20)).to.throw(TypeError);
      const obj2 = {
        a: 20,
        append: extracted,
      };
      expect(obj2.append(30)).to.deep.equal([20, 30]);

      const bound = obj1.append();
      expect(bound(40)).to.deep.equal([10, 40]);
      const obj3 = {
        a: 30,
        append: bound,
      };
      expect(obj3.append(50)).to.deep.equal([10, 50]);
    });
  });

  describe('If arity of f is 2', () => {
    const f = (a, b, ...rest) => [a, b, ...rest];
    it('Should have length = 2', () => {
      expect(curry(f).length).to.equal(2);
    });
    it('Should be curried f', () => {
      expect(curry(f)(10)(20)).to.deep.equal([10, 20]);
      expect(curry(f)()(30)()(40)).to.deep.equal([30, 40]);
      expect(curry(f)()(50)()()(60)).to.deep.equal([50, 60]);
      expect(curry(f)()()(70)()(80)).to.deep.equal([70, 80]);
      expect(curry(f)()()(90)()()(100)).to.deep.equal([90, 100]);
      expect(curry(f)(110, 120)).to.deep.equal([110, 120]);
      expect(curry(f)()(130, 140)).to.deep.equal([130, 140]);
      expect(curry(f)()()(150, 160)).to.deep.equal([150, 160]);
    });
    it('Should return functions that have correct length', () => {
      expect(curry(f)().length).to.equal(2);
      expect(curry(f)()().length).to.equal(2);
      expect(curry(f)(10).length).to.equal(1);
      expect(curry(f)()(10).length).to.equal(1);
      expect(curry(f)()()(10).length).to.equal(1);
      expect(curry(f)()()(10)()().length).to.equal(1);
    });
    it('Should pass additional arguments', () => {
      expect(curry(f)(10)(20, 30)).to.deep.equal([10, 20, 30]);
      expect(curry(f)(20, 30, 40)).to.deep.equal([20, 30, 40]);
      expect(curry(f)(40)(50, 60, 70)).to.deep.equal([40, 50, 60, 70]);
      expect(curry(f)(50, 60, 70, 80)).to.deep.equal([50, 60, 70, 80]);
      expect(curry(f)()(60, 70, 80)).to.deep.equal([60, 70, 80]);
      expect(curry(f)(70)()(80, 90, 100)).to.deep.equal([70, 80, 90, 100]);
      expect(curry(f)(80)(90, undefined, undefined)).to.deep.equal([
        80,
        90,
        undefined,
        undefined,
      ]);
    });
    it('Should be a reusable function', () => {
      const fc = curry(f);
      expect(fc(10)(20)).to.deep.equal([10, 20]);
      expect(fc(30)(40)).to.deep.equal([30, 40]);
      expect(fc(10)(20)).to.deep.equal([10, 20]);
      expect(fc()(50)()(60)).to.deep.equal([50, 60]);
      expect(fc()(70)()(80)).to.deep.equal([70, 80]);
      expect(fc(10)(20)).to.deep.equal([10, 20]);
      expect(fc(80)(90, 100)).to.deep.equal([80, 90, 100]);
      expect(fc(90)(100, 110)).to.deep.equal([90, 100, 110]);
      expect(fc(10)(20)).to.deep.equal([10, 20]);
    });
    it('Should return reusable functions', () => {
      const fc_e10 = curry(f)(10);
      expect(fc_e10(20)).to.deep.equal([10, 20]);
      expect(fc_e10(30)).to.deep.equal([10, 30]);
      expect(fc_e10(20)).to.deep.equal([10, 20]);
      expect(fc_e10()(40)).to.deep.equal([10, 40]);
      expect(fc_e10()(50)).to.deep.equal([10, 50]);
      expect(fc_e10(20)).to.deep.equal([10, 20]);
      expect(fc_e10(60, 70, 80)).to.deep.equal([10, 60, 70, 80]);
      expect(fc_e10(60, 80, 90)).to.deep.equal([10, 60, 80, 90]);
      expect(fc_e10(20)).to.deep.equal([10, 20]);
    });
    it("Should correctly handle 'this'", () => {
      const obj1 = {
        a: 10,
        append: curry(function(b, c) {
          return [this.a, b, c];
        }),
      };
      expect(obj1.append(20)(30)).to.deep.equal([10, 20, 30]);

      const extracted = obj1.append;
      expect(() => extracted(20, 30)).to.throw(TypeError);
      const obj2 = {
        a: 20,
        append: extracted,
      };
      expect(obj2.append(30)(40)).to.deep.equal([20, 30, 40]);

      const bound = obj1.append(40);
      expect(bound(50)).to.deep.equal([10, 40, 50]);

      const obj3 = {
        a: 60,
        append: bound,
      };

      expect(obj3.append(70)).to.deep.equal([10, 40, 70]);
    });
  });
  describe('If arity of f is 3', () => {
    const f = (a, b, c, ...rest) => [a, b, c, ...rest];
    it('Should have length = 3', () => {
      expect(curry(f).length).to.equal(3);
    });
    it('Should be curried f', () => {
      expect(curry(f)(10)(20)(30)).to.deep.equal([10, 20, 30]);
      expect(curry(f)(20, 30)(40)).to.deep.equal([20, 30, 40]);
      expect(curry(f)(30)(40, 50)).to.deep.equal([30, 40, 50]);
      expect(curry(f)(40, 50, 60)).to.deep.equal([40, 50, 60]);
      expect(curry(f)()()(50)()()(60)()()(70)).to.deep.equal([50, 60, 70]);
    });
    it('Should return functions that have correct length', () => {
      expect(curry(f)().length).to.equal(3);
      expect(curry(f)()().length).to.equal(3);
      expect(curry(f)(10).length).to.equal(2);
      expect(curry(f)()(10).length).to.equal(2);
      expect(curry(f)()()(10)()().length).to.equal(2);
      expect(curry(f)(10)(20).length).to.equal(1);
      expect(curry(f)(10, 20).length).to.equal(1);
      expect(curry(f)()()(10)()()(20)()().length).to.equal(1);
    });
    it('Should pass additional arguments', () => {
      expect(curry(f)(10)(20)(30, 40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(20)(30)(40, 50, 60)).to.deep.equal([20, 30, 40, 50, 60]);
      expect(curry(f)()()(30)()(40)()()(50, 60)).to.deep.equal([
        30,
        40,
        50,
        60,
      ]);
      expect(curry(f)(40)(50, 60, 70)).to.deep.equal([40, 50, 60, 70]);
      expect(curry(f)(50)(60, 70, 80, 90)).to.deep.equal([50, 60, 70, 80, 90]);
      expect(curry(f)(60, 70, 80, 90)).to.deep.equal([60, 70, 80, 90]);
      expect(curry(f)(70, 80, 90, 100, 110)).to.deep.equal([
        70,
        80,
        90,
        100,
        110,
      ]);
    });
    it('Should be a reusable function', () => {
      const fc = curry(f);
      expect(fc(10)(20)(30)).to.deep.equal([10, 20, 30]);
      expect(fc(40)(50)(60)).to.deep.equal([40, 50, 60]);
    });
    it('Should return reusable functions', () => {
      const fc_e10 = curry(f)(10);
      expect(fc_e10(20)(30)).to.deep.equal([10, 20, 30]);
      expect(fc_e10(40)(50)).to.deep.equal([10, 40, 50]);
      const fc_e60_e70 = curry(f)(60)(70);
      expect(fc_e60_e70(80)).to.deep.equal([60, 70, 80]);
      expect(fc_e60_e70(90)).to.deep.equal([60, 70, 90]);
    });
  });
  describe('If arity of f is 4', () => {
    const f = (a, b, c, d) => [a, b, c, d];
    it('Should be curried f', () => {
      expect(curry(f)(10)(20)(30)(40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10, 20)(30)(40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10)(20, 30)(40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10)(20)(30, 40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10, 20)(30, 40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10, 20, 30)(40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10)(20, 30, 40)).to.deep.equal([10, 20, 30, 40]);
      expect(curry(f)(10, 20, 30, 40)).to.deep.equal([10, 20, 30, 40]);
    });
  });
});
