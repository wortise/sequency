import {sequenceOf} from "../../../src/sequency";

describe("flatten", () => {
    it("should flatten sequence of sequences", () => {
        const array = sequenceOf(sequenceOf(1, 2), sequenceOf(3, 4), sequenceOf(5, 6))
            .flatten()
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should flatten sequence of arrays", () => {
        const array = sequenceOf([1, 2], [3, 4], [5, 6])
            .flatten()
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5, 6]);
    });
});