import {sequenceOf} from "../../../src/sequency";

describe("onEachIndexed", () => {
    it("should call action for each element", () => {
        const array: string[] = [];
        sequenceOf(1, 2, 3)
            .onEachIndexed((index, value) => array.push(`${index}: ${value}`))
            .toArray();

        expect(array).toEqual(["0: 1", "1: 2", "2: 3"]);
    });
});