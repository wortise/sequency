import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("maxBy", () => {
    it("should return max element by selector", async () => {
        const num = await asyncSequenceOf({a: 1}, {a: 3}, {a: 2})
            .maxBy(it => Promise.resolve(it.a));

        expect(num).toEqual({a: 3});
    });

    it("should return null on empty sequence", async () => {
        const num = await emptyAsyncSequence()
            .maxBy(() => Promise.resolve(0));

        expect(num).toBeNull();
    });
});