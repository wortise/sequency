import {sequenceOf} from "../../../src/sequency";

describe("filterIndexed", () => {
    it("should filter elements by index", () => {
        const array = sequenceOf(1, 2, 3)
            .filterIndexed((index, _value) => index < 2)
            .toArray();

        expect(array).toEqual([1, 2]);
    });
});