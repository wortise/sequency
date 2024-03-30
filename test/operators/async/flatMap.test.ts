import {asAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("flatMap", () => {
    it("should flatten element arrays", async () => {
        const array = await asyncSequenceOf([1, 2], [3, 4], [5, 6])
            .flatMap(it => Promise.resolve(asAsyncSequence(it)))
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5, 6]);
    });
});