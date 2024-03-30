import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("foldIndexed", () => {
    it("should 23 + sum of all numbers and indices", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .foldIndexed(23, async (index: number, acc: number, element: number) => acc + element + index);

        expect(result).toBe(32);
    });

    it("should return initial value on empty sequence", async () => {
        const result = await emptyAsyncSequence<number>()
            .foldIndexed(23, async (index: number, acc: number, element: number) => acc + element + index);

        expect(result).toBe(23);
    });
});