import {asyncSequenceOf} from "../../../src/sequency";

describe("sum", () => {
    it("should sum all numbers", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .sum();

        expect(result).toBe(6);
    });
});