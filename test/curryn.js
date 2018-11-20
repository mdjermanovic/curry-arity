import { expect } from 'chai';
import { curryN } from '../';

describe('curryN(f)', () => {
  describe('When n = f.length (same as curry(f))', () => {
    describe('If arity of f is 0', () => {
      const f = (...rest) => rest;
      it('Should have length = 0', () => {
        expect(curryN(0, f).length).to.equal(0);
      });
      it('Should just call f if invoked without arguments', () => {
        expect(curryN(0, f)()).to.deep.equal([]);
      });
      it('Should pass arguments', () => {
        expect(curryN(0, f)(10)).to.deep.equal([10]);
        expect(curryN(0, f)(20, 30)).to.deep.equal([20, 30]);
        expect(curryN(0, f)(undefined)).to.deep.equal([undefined]);
      });
      it('Should be a reusable function', () => {
        const fc = curryN(0, f);
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
          mc: curryN(0, function() {
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
        expect(curryN(1, f).length).to.equal(1);
      });
      it('Should be curried f', () => {
        expect(curryN(1, f)(10)).to.deep.equal([10]);
        expect(curryN(1, f)()(20)).to.deep.equal([20]);
        expect(curryN(1, f)()()(30)).to.deep.equal([30]);
      });
      it('Should return functions that have correct length', () => {
        expect(curryN(1, f)().length).to.equal(1);
        expect(curryN(1, f)()().length).to.equal(1);
      });
      it('Should pass additional arguments', () => {
        expect(curryN(1, f)(10, 20)).to.deep.equal([10, 20]);
        expect(curryN(1, f)()(30, 40, 50)).to.deep.equal([30, 40, 50]);
        expect(curryN(1, f)(60, undefined, undefined)).to.deep.equal([
          60,
          undefined,
          undefined,
        ]);
      });
      it('Should be a reusable function', () => {
        const fc = curryN(1, f);
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
        const fc_e = curryN(1, f)();
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
          append: curryN(1, function(b) {
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
        expect(curryN(2, f).length).to.equal(2);
      });
      it('Should be curried f', () => {
        expect(curryN(2, f)(10)(20)).to.deep.equal([10, 20]);
        expect(curryN(2, f)()(30)()(40)).to.deep.equal([30, 40]);
        expect(curryN(2, f)()(50)()()(60)).to.deep.equal([50, 60]);
        expect(curryN(2, f)()()(70)()(80)).to.deep.equal([70, 80]);
        expect(curryN(2, f)()()(90)()()(100)).to.deep.equal([90, 100]);
        expect(curryN(2, f)(110, 120)).to.deep.equal([110, 120]);
        expect(curryN(2, f)()(130, 140)).to.deep.equal([130, 140]);
        expect(curryN(2, f)()()(150, 160)).to.deep.equal([150, 160]);
      });
      it('Should return functions that have correct length', () => {
        expect(curryN(2, f)().length).to.equal(2);
        expect(curryN(2, f)()().length).to.equal(2);
        expect(curryN(2, f)(10).length).to.equal(1);
        expect(curryN(2, f)()(10).length).to.equal(1);
        expect(curryN(2, f)()()(10).length).to.equal(1);
        expect(curryN(2, f)()()(10)()().length).to.equal(1);
      });
      it('Should pass additional arguments', () => {
        expect(curryN(2, f)(10)(20, 30)).to.deep.equal([10, 20, 30]);
        expect(curryN(2, f)(20, 30, 40)).to.deep.equal([20, 30, 40]);
        expect(curryN(2, f)(40)(50, 60, 70)).to.deep.equal([40, 50, 60, 70]);
        expect(curryN(2, f)(50, 60, 70, 80)).to.deep.equal([50, 60, 70, 80]);
        expect(curryN(2, f)()(60, 70, 80)).to.deep.equal([60, 70, 80]);
        expect(curryN(2, f)(70)()(80, 90, 100)).to.deep.equal([
          70,
          80,
          90,
          100,
        ]);
        expect(curryN(2, f)(80)(90, undefined, undefined)).to.deep.equal([
          80,
          90,
          undefined,
          undefined,
        ]);
      });
      it('Should be a reusable function', () => {
        const fc = curryN(2, f);
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
        const fc_e10 = curryN(2, f)(10);
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
          append: curryN(2, function(b, c) {
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
        expect(curryN(3, f).length).to.equal(3);
      });
      it('Should be curried f', () => {
        expect(curryN(3, f)(10)(20)(30)).to.deep.equal([10, 20, 30]);
        expect(curryN(3, f)(20, 30)(40)).to.deep.equal([20, 30, 40]);
        expect(curryN(3, f)(30)(40, 50)).to.deep.equal([30, 40, 50]);
        expect(curryN(3, f)(40, 50, 60)).to.deep.equal([40, 50, 60]);
        expect(curryN(3, f)()()(50)()()(60)()()(70)).to.deep.equal([
          50,
          60,
          70,
        ]);
      });
      it('Should return functions that have correct length', () => {
        expect(curryN(3, f)().length).to.equal(3);
        expect(curryN(3, f)()().length).to.equal(3);
        expect(curryN(3, f)(10).length).to.equal(2);
        expect(curryN(3, f)()(10).length).to.equal(2);
        expect(curryN(3, f)()()(10)()().length).to.equal(2);
        expect(curryN(3, f)(10)(20).length).to.equal(1);
        expect(curryN(3, f)(10, 20).length).to.equal(1);
        expect(curryN(3, f)()()(10)()()(20)()().length).to.equal(1);
      });
      it('Should pass additional arguments', () => {
        expect(curryN(3, f)(10)(20)(30, 40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(3, f)(20)(30)(40, 50, 60)).to.deep.equal([
          20,
          30,
          40,
          50,
          60,
        ]);
        expect(curryN(3, f)()()(30)()(40)()()(50, 60)).to.deep.equal([
          30,
          40,
          50,
          60,
        ]);
        expect(curryN(3, f)(40)(50, 60, 70)).to.deep.equal([40, 50, 60, 70]);
        expect(curryN(3, f)(50)(60, 70, 80, 90)).to.deep.equal([
          50,
          60,
          70,
          80,
          90,
        ]);
        expect(curryN(3, f)(60, 70, 80, 90)).to.deep.equal([60, 70, 80, 90]);
        expect(curryN(3, f)(70, 80, 90, 100, 110)).to.deep.equal([
          70,
          80,
          90,
          100,
          110,
        ]);
      });
      it('Should be a reusable function', () => {
        const fc = curryN(3, f);
        expect(fc(10)(20)(30)).to.deep.equal([10, 20, 30]);
        expect(fc(40)(50)(60)).to.deep.equal([40, 50, 60]);
      });
      it('Should return reusable functions', () => {
        const fc_e10 = curryN(3, f)(10);
        expect(fc_e10(20)(30)).to.deep.equal([10, 20, 30]);
        expect(fc_e10(40)(50)).to.deep.equal([10, 40, 50]);
        const fc_e60_e70 = curryN(3, f)(60)(70);
        expect(fc_e60_e70(80)).to.deep.equal([60, 70, 80]);
        expect(fc_e60_e70(90)).to.deep.equal([60, 70, 90]);
      });
    });
    describe('If arity of f is 4', () => {
      const f = (a, b, c, d) => [a, b, c, d];
      it('Should be curried f', () => {
        expect(curryN(4, f)(10)(20)(30)(40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10, 20)(30)(40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10)(20, 30)(40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10)(20)(30, 40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10, 20)(30, 40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10, 20, 30)(40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10)(20, 30, 40)).to.deep.equal([10, 20, 30, 40]);
        expect(curryN(4, f)(10, 20, 30, 40)).to.deep.equal([10, 20, 30, 40]);
      });
    });
  });
  describe('When n < f.length', () => {
    const f = (a, b, c, d, e) => [a, b, c, d, e];
    it('Should have length = n', () => {
      expect(f.length).to.equal(5);
      expect(curryN(3, f).length).to.equal(3);
    });
    it('Should be curried f', () => {
      expect(curryN(3, f)(10)(20)(30)).to.deep.equal([
        10,
        20,
        30,
        undefined,
        undefined,
      ]);
      expect(curryN(3, f)(20, 30)(40)).to.deep.equal([
        20,
        30,
        40,
        undefined,
        undefined,
      ]);
      expect(curryN(3, f)(30)(40, 50)).to.deep.equal([
        30,
        40,
        50,
        undefined,
        undefined,
      ]);
      expect(curryN(3, f)(40, 50, 60)).to.deep.equal([
        40,
        50,
        60,
        undefined,
        undefined,
      ]);
    });
    it('Should return functions that have correct length', () => {
      expect(curryN(3, f)().length).to.equal(3);
      expect(curryN(3, f)()().length).to.equal(3);
      expect(curryN(3, f)(10).length).to.equal(2);
      expect(curryN(3, f)()(10).length).to.equal(2);
      expect(curryN(3, f)()()(10)()().length).to.equal(2);
      expect(curryN(3, f)(10)(20).length).to.equal(1);
      expect(curryN(3, f)(10, 20).length).to.equal(1);
      expect(curryN(3, f)()()(10)()()(20)()().length).to.equal(1);
    });
  });
  describe('When n > f.length', () => {
    const f = (a, b, c, ...rest) => [a, b, c, ...rest];
    it('Should have length = n', () => {
      expect(f.length).to.equal(3);
      expect(curryN(5, f).length).to.equal(5);
    });
    it('Should be curried f', () => {
      expect(curryN(5, f)(10)(20)(30)(40)(50)).to.deep.equal([
        10,
        20,
        30,
        40,
        50,
      ]);
    });
    it('Should return functions that have correct length', () => {
      expect(curryN(5, f)(10).length).to.equal(4);
      expect(curryN(5, f)(10)(20).length).to.equal(3);
      expect(curryN(5, f)(10, 20).length).to.equal(3);
      expect(curryN(5, f)(10)(20)(30).length).to.equal(2);
      expect(curryN(5, f)(10)(20)(30)(40).length).to.equal(1);
      expect(curryN(5, f)(10, 20)(30, 40).length).to.equal(1);
    });
  });
});
