import {sequenceOf} from "../../../src/sequency";

describe("toSet", () => {
    it("should return new set of distinct items", () => {
        const result = sequenceOf(1, 2, 2, 3, 3, 3)
            .toSet();

        expect(result).toEqual(new Set([1, 2, 3]));
    });

    it("should add distinct items to existing set", () => {
        const existingSet = new Set([4]);
        const result = sequenceOf(1, 2, 2, 3, 3, 3)
            .toSet(existingSet);

        expect(result).toBe(existingSet);
        expect(result).toEqual(new Set([1, 2, 3, 4]));
    });
});