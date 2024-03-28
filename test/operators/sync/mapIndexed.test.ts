import {sequenceOf} from "../../../src/sequency";

describe("mapIndexed", () => {
    it("should map elements by index and value", () => {
        const array = sequenceOf(1, 2, 3)
            .mapIndexed((index, value) => `${index}: ${value}`)
            .toArray();

        expect(array).toEqual(["0: 1", "1: 2", "2: 3"]);
    });
});