import {asyncSequenceOf} from "../../../src/sequency";

describe("findLast", () => {
    it("should return last element of sequence", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .findLast();

        expect(result).toBe(3);
    });

    it("should return null on empty sequence", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .filter(async it => it > 3)
            .findLast();

        expect(result).toBeNull();
    });

    it("should return last element matching predicate", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .findLast(async it => it > 1);

        expect(result).toBe(3);
    });
});