import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("average", () => {
    it("should calculate average", async () => {
        const avg = await asyncSequenceOf(1, 2, 3, 4)
            .average();

        expect(avg).toBe(2.5);
    });

    it("should return NaN on empty sequence", async () => {
        const sequence = emptyAsyncSequence<number>();
        const avg = await sequence.average();

        expect(avg).toBeNaN();
    });
});