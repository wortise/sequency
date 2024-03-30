import {asyncSequenceOf} from "../../../src/sequency";

describe("filterIndexed", () => {
    it("should filter elements by index", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .filterIndexed((index, _value) => Promise.resolve(index < 2))
            .toArray();

        expect(array).toEqual([1, 2]);
    });
});