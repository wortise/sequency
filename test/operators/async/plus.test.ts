import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("plus", () => {
    it("should append element", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .plus(4)
            .toArray();

        expect(array).toEqual([1, 2, 3, 4]);
    });

    it("should append array", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .plus([4, 5])
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should append sequence", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .plus(asyncSequenceOf(4, 5))
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should append empty sequence", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .plus(emptyAsyncSequence())
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });
});