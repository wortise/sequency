import {asyncSequenceOf} from "../../../src/sequency";

describe("distinct", () => {
    it("should dismiss duplicate items", async () => {
        const result = await asyncSequenceOf(1, 1, 2, 3)
            .distinct()
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });
});
