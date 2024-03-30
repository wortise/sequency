import {asyncSequenceOf} from "../../../src/sequency";

describe("reverse", () => {
    it("should reverse order", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .reverse()
            .toArray();

        expect(array).toEqual([3, 2, 1]);
    });
});