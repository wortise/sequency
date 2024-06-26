import {asyncSequenceOf} from "../../../src/sequency";

describe("any", () => {
    it("should return false", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .filter(async it => it > 3)
            .any();

        expect(result).toBe(false);
    });

    it("should return true", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .filter(async it => it > 1)
            .any();

        expect(result).toBe(true);
    });

    it("should evaluate predicate and return false", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .any(async it => it > 3);

        expect(result).toBe(false);
    });

    it("should evaluate predicate and return true", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .any(async it => it > 2);

        expect(result).toBe(true);
    });
});