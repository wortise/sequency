import {emptySequence, sequenceOf} from "../../../src/sequency";

describe("minus", () => {
    it("should remove element", () => {
        const array = sequenceOf(1, 2, 3)
            .minus(1)
            .toArray();

        expect(array).toEqual([2, 3]);
    });

    it("should remove array", () => {
        const array = sequenceOf(1, 2, 3, 4, 5)
            .minus([2, 4])
            .toArray();

        expect(array).toEqual([1, 3, 5]);
    });

    it("should append sequence", () => {
        const array = sequenceOf(1, 2, 3)
            .minus(sequenceOf(1, 2))
            .toArray();

        expect(array).toEqual([3]);
    });

    it("should append empty sequence", () => {
        const array = sequenceOf(1, 2, 3)
            .minus(emptySequence())
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });
});