import {asyncSequenceOf} from "../../../src/sequency";

describe("toSet", () => {
    it("should return new set of distinct items", async () => {
        const result = await asyncSequenceOf(1, 2, 2, 3, 3, 3)
            .toSet();

        expect(result).toEqual(new Set([1, 2, 3]));
    });

    it("should add distinct items to existing set", async () => {
        const existingSet = new Set([4]);
        const result = await asyncSequenceOf(1, 2, 2, 3, 3, 3)
            .toSet(existingSet);

        expect(result).toBe(existingSet);
        expect(result).toEqual(new Set([1, 2, 3, 4]));
    });
});