import {sequenceOf} from "../../../src/sequency";

describe("zip", () => {
    it("should combine items from both sequences into pairs", () => {
        const array = sequenceOf("a", "b", "c")
            .zip(sequenceOf(1, 2, 3))
            .toArray();

        expect(array).toEqual([
            ["a", 1],
            ["b", 2],
            ["c", 3]
        ]);
    });

    it("should discard elements if length of sequences is different", () => {
        const array = sequenceOf(1, 2, 3)
            .zip(sequenceOf(1, 2, 3, 4, 5, 6, 7))
            .toArray();

        expect(array).toEqual([
            [1, 1],
            [2, 2],
            [3, 3]
        ]);
    });
});