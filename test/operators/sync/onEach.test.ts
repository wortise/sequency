import {sequenceOf} from "../../../src/sequency";

describe("onEach", () => {
    it("should call action for each element", () => {
        const array: number[] = [];
        const result = sequenceOf(1, 2, 3)
            .onEach(it => array.push(it))
            .toArray();

        expect(array).toEqual([1, 2, 3]);
        expect(result).toEqual(array);
    });
});