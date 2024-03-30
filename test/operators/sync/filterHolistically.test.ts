import {sequenceOf} from "../../../src/sequency";

describe("filterHolistically", () => {
    it("should filter elements as a whole", () => {
        const array = sequenceOf(1, 2, 2, 3, 3, 3)
            .filterHolistically((value, _index, array) => array.filter(v => v === value).length < 3)
            .toArray();

        expect(array).toEqual([1, 2, 2]);
    });
});