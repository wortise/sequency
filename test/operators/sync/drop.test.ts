import {sequenceOf} from "../../../src/sequency";

describe("drop", () => {
    it("should drop 2 items", () => {
        const result = sequenceOf(1, 2, 3, 4)
            .drop(2)
            .toArray();

        expect(result).toEqual([3, 4]);
    });

    it("should drop all items", () => {
        const result = sequenceOf(1, 2, 3, 4)
            .drop(4)
            .toArray();

        expect(result.length).toBe(0);
    });

    it("should drop all items even if overflow", () => {
        const result = sequenceOf(1, 2, 3, 4)
            .drop(10)
            .toArray();

        expect(result.length).toBe(0);
    });

    it("should drop nothing for n = 0", () => {
        const result = sequenceOf(1, 2, 3)
            .drop(0)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });

    it("should drop nothing for n < 0", () => {
        const result = sequenceOf(1, 2, 3)
            .drop(-10)
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });
});