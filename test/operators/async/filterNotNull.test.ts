import {asyncSequenceOf} from "../../../src/sequency";

describe("filterNotNull", () => {
    it("should skip null elements", async () => {
        const array: number[] = await asyncSequenceOf(1, null, 2, null, 3)
            .filterNotNull()
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });
});