import {asSequence, sequenceOf} from "../../../src/sequency";

describe("flatMap", () => {
    it("should flatten element arrays", () => {
        const array = sequenceOf([1, 2], [3, 4], [5, 6])
            .flatMap(it => asSequence(it))
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5, 6]);
    });
});