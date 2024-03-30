import {asSequence, sequenceOf} from "../../../src/sequency";

describe("toArray", () => {
    it("should return new array", () => {
        const input = [1, 2, 3];
        const array = asSequence(input)
            .toArray();

        expect(array).not.toBe(input);
        expect(array).toEqual(input);
    });

    it("should append items to passed array", () => {
        const array = [1];
        const result = sequenceOf(2, 3, 4)
            .toArray(array);

        expect(result).toBe(array);
        expect(result).toEqual([1, 2, 3, 4]);
    });
});