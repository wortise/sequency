import {asyncSequenceOf, asAsyncSequence, sequenceOf} from "../../../src/sequency";

describe("toSequence", () => {
    it("should return a regular sequence", async () => {
        const input = [1, 2, 3];
        const array = (await asAsyncSequence(input).toSequence())
            .toArray();

        expect(array).not.toBe(input);
        expect(array).toEqual(input);
    });

    it("should append items to passed regular sequence", async () => {
        const result = (await asyncSequenceOf(2, 3, 4).toSequence(sequenceOf(1)))
            .toArray();

        expect(result).toEqual([1, 2, 3, 4]);
    });
});