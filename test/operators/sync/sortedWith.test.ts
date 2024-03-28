import {sequenceOf} from "../../../src/sequency";

describe("sortedWith", () => {
    it("should sort numbers by given comparator", () => {
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sortedWith((a, b) => {
                if (a < b) {
                    return 1;
                }
                if (a > b) {
                    return -1;
                }
                return 0;
            })
            .toArray();

        expect(array).toEqual([5, 4, 3, 2, 1]);
    });
});