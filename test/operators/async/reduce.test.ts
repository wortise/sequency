import {asyncSequenceOf} from "../../../src/sequency";

describe("reduce", () => {
    it("should sum all numbers", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .reduce(async (acc: number, value: number) => acc + value);

        expect(result).toBe(6);
    });

    it("should concat all strings", async () => {
        const result = await asyncSequenceOf("a", "b", "c")
            .reduce(async (acc: string, value: string) => `${acc}, ${value}`);

        expect(result).toBe("a, b, c");
    });
});