import {asyncSequenceOf} from "../../../src/sequency";

describe("indexOfFirst", () => {
    it("should return index of first element matching given predicate", async () => {
        const index = await asyncSequenceOf(1, 2, 2, 3)
            .indexOfFirst(it => Promise.resolve(it > 1));

        expect(index).toBe(1);
    });
});