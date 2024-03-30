import {asyncSequenceOf} from "../../../src/sequency";

describe("associate", () => {
    it("should associate map", async () => {
        const map = await asyncSequenceOf(1, 2, 3)
            .associate(async it => [`key_${it}`, it]);
        expect(map.size).toBe(3);

        expect(map).toEqual(
            new Map([
                ["key_1", 1],
                ["key_2", 2],
                ["key_3", 3]
            ])
        );
    });

    it("latest entries should win in case of duplicates", async () => {
        const map = await asyncSequenceOf({k: 1, v: 1}, {k: 1, v: 11}, {k: 1, v: 111}, {k: 2, v: 222})
            .associate(async it => [it.k, it.v]);

        expect(map).toEqual(
            new Map([
                [1, 111],
                [2, 222]
            ])
        );
    });
});