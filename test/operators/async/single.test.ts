import {emptyAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("single", () => {
    it("should return single element", async () => {
        const result = await asyncSequenceOf(23)
            .single();

        expect(result).toBe(23);
    });

    it("should throw with more than one element", () => {
        expect(
            () => asyncSequenceOf(1, 2).single()
        ).rejects.toThrow("Expect single element");
    });

    it("should throw with zero elements", () => {
        expect(
            () => emptyAsyncSequence().single()
        ).rejects.toThrow("No such element");
    });

    it("should evaluate predicate and return single element", async () => {
        const result = await asyncSequenceOf(1, 2, 3)
            .single(async it => it > 2);

        expect(result).toBe(3);
    });

    it("should evaluate predicate and throw with more than one element", () => {
        expect(
            () => asyncSequenceOf(1, 2)
                .single(async it => it > 0)
        ).rejects.toThrow("Expect single element");
    });

    it("should evaluate predicate and throw with zero elements", () => {
        expect(
            () => asyncSequenceOf(1, 2, 3)
                .single(async it => it > 3)
        ).rejects.toThrow("No such element");
    });
});