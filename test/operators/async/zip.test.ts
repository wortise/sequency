import {asyncSequenceOf} from "../../../src/sequency";

describe("zip", () => {
    it("should combine items from both sequences into pairs", async () => {
        const array = await asyncSequenceOf("a", "b", "c")
            .zip(asyncSequenceOf(1, 2, 3))
            .toArray();

        expect(array).toEqual([
            ["a", 1],
            ["b", 2],
            ["c", 3]
        ]);
    });

    it("should discard elements if length of sequences is different", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .zip(asyncSequenceOf(1, 2, 3, 4, 5, 6, 7))
            .toArray();

        expect(array).toEqual([
            [1, 1],
            [2, 2],
            [3, 3]
        ]);
    });
});