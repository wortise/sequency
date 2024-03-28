import {generateSequence} from "../src/sequency";

describe("generateSequence", () => {
    it("should generate sequence", () => {
        let count = 0;
        const result = generateSequence(() => count++)
            .take(5)
            .toArray();

        expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("should generate sequence with drop and take", () => {
        let count = 0;
        const result = generateSequence(() => count++)
            .drop(5)
            .take(5)
            .toArray();

        expect(result).toEqual([5, 6, 7, 8, 9]);
    });

    it("should generate sequence with seed", () => {
        const result = generateSequence(10, value => value + 1)
            .takeWhile(it => it < 15)
            .toArray();

        expect(result).toEqual([10, 11, 12, 13, 14]);
    });

    it("should generate empty sequence with seed of null", () => {
        const result = generateSequence(null as unknown as number, a => a)
            .count();

        expect(result).toBe(0);
    });

    it("should generate empty sequence with seed of undefined", () => {
        const result = generateSequence(undefined as unknown as number, a => a)
            .count();

        expect(result).toBe(0);
    });

    it("should generate sequence with seedFunction", () => {
        const result = generateSequence(() => 10, value => value + 1)
            .takeWhile(it => it < 15)
            .toArray();

        expect(result).toEqual([10, 11, 12, 13, 14]);
    });

    it("should generate empty sequence with seedFunction result of null", () => {
        const result = generateSequence(() => null as unknown as number, a => a)
            .count();

        expect(result).toBe(0);
    });

    it("should generate empty sequence with seedFunction result of undefined", () => {
        const result = generateSequence(() => undefined as unknown as number, a => a)
            .count();

        expect(result).toBe(0);
    });
});