import {sequenceOf} from "../../../src/sequency";

describe("filter", () => {
    it("should filter elements", () => {
        const array = sequenceOf(1, 2, 3)
            .filter(it => it > 1)
            .toArray();

        expect(array).toEqual([2, 3]);
    });
});