import {asyncSequenceOf} from "../../../src/sequency";

describe("filterNot", () => {
    it("should filter elements", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .filterNot(async it => it > 2)
            .toArray();

        expect(result).toEqual([1, 2]);
    });
});