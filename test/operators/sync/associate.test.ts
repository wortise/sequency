import {sequenceOf} from "../../../src/sequency";

describe("associate", () => {
    it("should associate map", () => {
        const map = sequenceOf(1, 2, 3)
            .associate(it => ([`key_${it}`, it]));
        expect(map.size).toBe(3);

        expect(map).toEqual(
            new Map([
                ["key_1", 1],
                ["key_2", 2],
                ["key_3", 3]
            ])
        );
    });

    it("latest entries should win in case of duplicates", () => {
        const map = sequenceOf({k: 1, v: 1}, {k: 1, v: 11}, {k: 1, v: 111}, {k: 2, v: 222})
            .associate(it => ([it.k, it.v]));

        expect(map).toEqual(
            new Map([
                [1, 111],
                [2, 222]
            ])
        );
    });
});