import {asyncSequenceOf} from "../../../src/sequency";

describe("flatten", () => {
    it("should flatten sequence of sequences", async () => {
        const array = await asyncSequenceOf(asyncSequenceOf(1, 2), asyncSequenceOf(3, 4), asyncSequenceOf(5, 6))
            .flatten()
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should flatten sequence of arrays", async () => {
        const array = await asyncSequenceOf([1, 2], [3, 4], [5, 6])
            .flatten()
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5, 6]);
    });
});