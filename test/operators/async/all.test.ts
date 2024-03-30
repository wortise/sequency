import {asyncSequenceOf} from "../../../src/sequency";

describe("all", () => {
    it("should return false", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .all(async it => it > 1);

        expect(result).toBe(false);
    });

    it("should return true", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .all(async it => it > 0);

        expect(result).toBe(true);
    });
});