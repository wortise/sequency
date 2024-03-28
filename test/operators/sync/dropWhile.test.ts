import {sequenceOf} from "../../../src/sequency";

describe("dropWhile", () => {
    it("should drop elements until predicate evaluates to false", () => {
        const result = sequenceOf(1, 2, 3, 2, 1)
            .dropWhile(it => it < 3)
            .toArray();

        expect(result).toEqual([3, 2, 1]);
    });

    it("should drop no elements", () => {
        const result = sequenceOf(1, 2, 3)
            .dropWhile(it => it > 3)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });

    it("should drop all elements", () => {
        const result = sequenceOf(1, 2, 3)
            .dropWhile(it => it > 0)
            .toArray();

        expect(result.length).toBe(0);
    });
});