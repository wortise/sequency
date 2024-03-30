import {asyncSequenceOf} from "../../../src/sequency";

describe("take", () => {
    it("should take first 2 items", async () => {
        const result = await asyncSequenceOf(1, 2, 3, 4)
            .take(2)
            .toArray();

        expect(result).toEqual([1, 2]);
    });

    it("should take no items", async () => {
        const result = await asyncSequenceOf(1, 2, 3, 4)
            .take(0)
            .toArray();

        expect(result.length).toBe(0);
    });

    it("should take all items even if overflow", async () => {
        const result = await asyncSequenceOf(1, 2, 3, 4)
            .take(10)
            .toArray();

        expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should take nothing for n < 0", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .take(-10)
            .toArray();

        expect(result.length).toBe(0);
    });
});