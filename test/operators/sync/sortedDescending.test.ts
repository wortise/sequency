import {sequenceOf} from "../../../src/sequency";

describe("sorted", () => {
    it("should sort numbers descending", () => {
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sortedDescending()
            .toArray();

        expect(array).toEqual([5, 4, 3, 2, 1]);
    });

    it("should sort strings descending", () => {
        const array = sequenceOf("1", "4", "3", "5", "2")
            .sortedDescending()
            .toArray();

        expect(array).toEqual(["5", "4", "3", "2", "1"]);
    });
});