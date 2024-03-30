import {asyncSequenceOf} from "../../../src/sequency";

describe("count", () => {
    it("should count results", async () => {
        const num = await asyncSequenceOf(1, 2, 3).count();

        expect(num).toBe(3);
    });

    it("should evaluate predicate and count results", async () => {
        const num = await asyncSequenceOf(1, 2, 3)
            .count(async it => it > 1);

        expect(num).toBe(2);
    });
});