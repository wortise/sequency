import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("minus", () => {
    it("should remove element", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .minus(1)
            .toArray();

        expect(array).toEqual([2, 3]);
    });

    it("should remove array", async () => {
        const array = await asyncSequenceOf(1, 2, 3, 4, 5)
            .minus([2, 4])
            .toArray();

        expect(array).toEqual([1, 3, 5]);
    });

    it("should append sequence", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .minus(asyncSequenceOf(1, 2))
            .toArray();

        expect(array).toEqual([3]);
    });

    it("should append empty sequence", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .minus(emptyAsyncSequence())
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });
});