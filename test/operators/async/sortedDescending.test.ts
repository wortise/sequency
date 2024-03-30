import {asyncSequenceOf} from "../../../src/sequency";

describe("sorted", () => {
    it("should sort numbers descending", async () => {
        const array = await asyncSequenceOf(1, 4, 3, 5, 2)
            .sortedDescending()
            .toArray();

        expect(array).toEqual([5, 4, 3, 2, 1]);
    });

    it("should sort strings descending", async () => {
        const array = await asyncSequenceOf("1", "4", "3", "5", "2")
            .sortedDescending()
            .toArray();

        expect(array).toEqual(["5", "4", "3", "2", "1"]);
    });
});