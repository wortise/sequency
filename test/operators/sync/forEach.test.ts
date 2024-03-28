import {sequenceOf} from "../../../src/sequency";

describe("forEach", () => {
    it("should call action for each element", () => {
        const array: number[] = [];
        sequenceOf(1, 2, 3)
            .forEach(it => array.push(it));

        expect(array).toEqual([1, 2, 3]);
    });
});