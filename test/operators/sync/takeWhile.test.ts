import {sequenceOf} from "../../../src/sequency";

describe("takeWhile", () => {
    it("should take elements until predicate evaluates to false", () => {
        const result = sequenceOf(1, 2, 3, 2, 1)
            .takeWhile(it => it < 3)
            .toArray();

        expect(result).toEqual([1, 2]);
    });

    it("should take no elements", () => {
        const result = sequenceOf(1, 2, 3)
            .takeWhile(it => it > 3)
            .toArray();

        expect(result.length).toBe(0);
    });

    it("should take all elements", () => {
        const result = sequenceOf(1, 2, 3)
            .takeWhile(it => it > 0)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });
});