import {sequenceOf} from "../../../src/sequency";

describe("filterNot", () => {
    it("should filter elements", () => {
        const result = sequenceOf(1, 2, 3)
            .filterNot(it => it > 2)
            .toArray();

        expect(result).toEqual([1, 2]);
    });
});