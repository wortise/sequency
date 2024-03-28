import {emptySequence, sequenceOf} from "../../../src/sequency";

describe("plus", () => {
    it("should append element", () => {
        const array = sequenceOf(1, 2, 3)
            .plus(4)
            .toArray();

        expect(array).toEqual([1, 2, 3, 4]);
    });

    it("should append array", () => {
        const array = sequenceOf(1, 2, 3)
            .plus([4, 5])
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should append sequence", () => {
        const array = sequenceOf(1, 2, 3)
            .plus(sequenceOf(4, 5))
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should append empty sequence", () => {
        const array = sequenceOf(1, 2, 3)
            .plus(emptySequence())
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });
});