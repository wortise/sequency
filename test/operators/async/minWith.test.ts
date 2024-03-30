import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("minWith", () => {
    it("should return min element by comparator", async () => {
        const num = await asyncSequenceOf({a: 1}, {a: 3}, {a: 2})
            .minWith((o1, o2) => Promise.resolve(o1.a > o2.a ? 1 : (o1.a < o2.a ? -1 : 0)));

        expect(num).toEqual({a: 1});
    });

    it("should return null on empty sequence", async () => {
        const num = await emptyAsyncSequence()
            .maxWith(() => Promise.resolve(0));

        expect(num).toBeNull();
    });
});