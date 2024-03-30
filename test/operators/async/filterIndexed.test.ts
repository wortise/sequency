import {asyncSequenceOf} from "../../../src/sequency";

describe("filterIndexed", () => {
    it("should filter elements by index", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .filterIndexed(async (index, _value) => index < 2)
            .toArray();

        expect(array).toEqual([1, 2]);
    });
});