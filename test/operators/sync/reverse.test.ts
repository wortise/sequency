import {sequenceOf} from "../../../src/sequency";

describe("reverse", () => {
    it("should reverse order", () => {
        const array = sequenceOf(1, 2, 3)
            .reverse()
            .toArray();

        expect(array).toEqual([3, 2, 1]);
    });
});