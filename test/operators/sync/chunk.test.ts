import {sequenceOf} from "../../../src/sequency";

describe("chunk", () => {
    it("should return list of chunks", () => {
        const chunks = sequenceOf(1, 2, 3, 4, 5)
            .chunk(2);

        expect(chunks).toEqual([
            [1, 2],
            [3, 4],
            [5]
        ]);
    });

    it("should return single chunk", () => {
        const chunks = sequenceOf(1, 2, 3)
            .chunk(5);

        expect(chunks).toEqual([
            [1, 2, 3]
        ]);
    });

    it("should return one-size chunks", () => {
        const chunks = sequenceOf(1, 2, 3)
            .chunk(1);

        expect(chunks).toEqual([
            [1],
            [2],
            [3]
        ]);
    });

    it("should throw", () => {
        expect(
            () => sequenceOf(1, 2, 3).chunk(0)
        ).toThrow("chunkSize must be > 0 but is 0");
        expect(
            () => sequenceOf(1, 2, 3).chunk(-1)
        ).toThrow("chunkSize must be > 0 but is -1");
    });
});