import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("fold", () => {
    it("should 23 + sum of all numbers", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .fold(23, async (acc: number, value: number) => acc + value);

        expect(result).toBe(29);
    });

    it("should return initial value on empty sequence", async () => {
        const result = await emptyAsyncSequence<number>()
            .fold(23, async (acc: number, value: number) => acc + value);

        expect(result).toBe(23);
    });
});