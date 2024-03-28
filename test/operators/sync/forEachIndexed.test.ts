import {sequenceOf} from "../../../src/sequency";

describe("forEach", () => {
    it("should call action for each element", () => {
        const array: string[] = [];
        sequenceOf(1, 2, 3)
            .forEachIndexed((index, value) => array.push(`${index}: ${value}`));

        expect(array).toEqual(["0: 1", "1: 2", "2: 3"]);
    });
});