import {asyncSequenceOf} from "../../../src/sequency";

describe("takeWhile", () => {
    it("should take elements until predicate evaluates to false", async () => {
        const result = await asyncSequenceOf(1, 2, 3, 2, 1)
            .takeWhile(async it => it < 3)
            .toArray();

        expect(result).toEqual([1, 2]);
    });

    it("should take no elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .takeWhile(async it => it > 3)
            .toArray();

        expect(result.length).toBe(0);
    });

    it("should take all elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .takeWhile(async it => it > 0)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });
});