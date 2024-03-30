import {asyncSequenceOf} from "../../../src/sequency";

describe("dropWhile", () => {
    it("should drop elements until predicate evaluates to false", async () => {
        const result = await asyncSequenceOf(1, 2, 3, 2, 1)
            .dropWhile(async it => it < 3)
            .toArray();

        expect(result).toEqual([3, 2, 1]);
    });

    it("should drop no elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .dropWhile(async it => it > 3)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });

    it("should drop all elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .dropWhile(async it => it > 0)
            .toArray();

        expect(result.length).toBe(0);
    });
});