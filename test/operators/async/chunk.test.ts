import {asyncSequenceOf} from "../../../src/sequency";

describe("chunk", () => {
    it("should return list of chunks", async () => {
        const chunks = await asyncSequenceOf(1, 2, 3, 4, 5)
            .chunk(2);

        expect(chunks).toEqual([
            [1, 2],
            [3, 4],
            [5]
        ]);
    });

    it("should return single chunk", async () => {
        const chunks = await asyncSequenceOf(1, 2, 3)
            .chunk(5);

        expect(chunks).toEqual([
            [1, 2, 3]
        ]);
    });

    it("should return one-size chunks", async () => {
        const chunks = await asyncSequenceOf(1, 2, 3)
            .chunk(1);

        expect(chunks).toEqual([
            [1],
            [2],
            [3]
        ]);
    });

    it("should throw", async () => {
        await expect(
            () => asyncSequenceOf(1, 2, 3).chunk(0)
        ).rejects.toThrow("chunkSize must be > 0 but is 0");
        await expect(
            () => asyncSequenceOf(1, 2, 3).chunk(-1)
        ).rejects.toThrow("chunkSize must be > 0 but is -1");
    });
});