import {asyncSequenceOf, asSequence, sequenceOf} from "../../../src/sequency";

describe("toAsyncSequence", () => {
    it("should return an async sequence", async () => {
        const input = [1, 2, 3];
        const array = await asSequence(input).toAsyncSequence()
            .toArray();

        expect(array).not.toBe(input);
        expect(array).toEqual(input);
    });

    it("should append items to passed async sequence", async () => {
        const result = await sequenceOf(2, 3, 4).toAsyncSequence(asyncSequenceOf(1))
            .toArray();

        expect(result).toEqual([1, 2, 3, 4]);
    });
});