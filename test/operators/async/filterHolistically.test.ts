import {asyncSequenceOf} from "../../../src/sequency";

describe("filterHolistically", () => {
    it("should filter elements as a whole", async () => {
        const array = await asyncSequenceOf(1, 2, 2, 3, 3, 3)
            .filterHolistically(async (value, _index, array) => array.filter(v => v === value).length < 3)
            .toArray();

        expect(array).toEqual([1, 2, 2]);
    });
});