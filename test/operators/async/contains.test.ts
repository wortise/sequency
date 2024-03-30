import {asyncSequenceOf} from "../../../src/sequency";

describe("contains", () => {
    it("should contain element", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .contains(Promise.resolve(3));

        expect(result).toBe(true);
    });

    it("should not contain element", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .contains(Promise.resolve(4));

        expect(result).toBe(false);
    });
});