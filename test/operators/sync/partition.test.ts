import {sequenceOf} from "../../../src/sequency";

describe("partition", () => {
    it("should partition based on the given predicate", () => {
        const result = sequenceOf(1, 2, 3, 4)
            .partition(it => it % 2 === 1);

        expect(result).toHaveProperty("true");
        expect(result).toHaveProperty("false");
        expect(result.true).toEqual([1, 3]);
        expect(result.false).toEqual([2, 4]);
    });
});