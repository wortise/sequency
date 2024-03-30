import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("minBy", () => {
    it("should return min element by selector", async () => {
        const num = await asyncSequenceOf({a: 1}, {a: 3}, {a: 2})
            .minBy(async it => it.a);

        expect(num).toEqual({a: 1});
    });

    it("should return null on empty sequence", async () => {
        const num = await emptyAsyncSequence()
            .minBy(async () => 0);

        expect(num).toBeNull();
    });
});