import {asyncSequenceOf} from "../../../src/sequency";

describe("find", () => {
    it("should return first element of sequence", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .filter(async it => it > 2)
            .find();

        expect(result).toBe(3);
    });

    it("should return null on empty sequence", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .filter(async it => it > 3)
            .find();

        expect(result).toBeNull();
    });

    it("should return first element matching predicate", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .find(async it => it > 2);

        expect(result).toBe(3);
    });
});