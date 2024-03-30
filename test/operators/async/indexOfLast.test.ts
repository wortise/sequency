import {asyncSequenceOf} from "../../../src/sequency";

describe("indexOfLast", () => {
    it("should return index of last element matching given predicate", async () => {
        const index = await asyncSequenceOf(1, 2, 2, 1)
            .indexOfLast(it => Promise.resolve(it > 1));

        expect(index).toBe(2);
    });
});