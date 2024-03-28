import {sequenceOf} from "../../../src/sequency";

describe("associateBy", () => {
    it("should associate map by keySelector", () => {
        const a = {k: 1, v: 11};
        const b = {k: 2, v: 22};
        const c = {k: 3, v: 33};

        const map = sequenceOf(a, b, c)
            .associateBy(it => it.k);

        expect(map).toEqual(
            new Map([
                [1, a],
                [2, b],
                [3, c]
            ])
        );
    });

    it("should associate map by key", () => {
        const a = {k: 1, v: 11};
        const b = {k: 2, v: 22};
        const c = {k: 3, v: 33};

        const map = sequenceOf(a, b, c)
            .associateBy("k");

        expect(map).toEqual(
            new Map([
                [1, a],
                [2, b],
                [3, c]
            ])
        );
    });

    it("should associate map by keySelector and valueTransformer", () => {
        const a = {k: 1, v: 11};
        const b = {k: 2, v: 22};
        const c = {k: 3, v: 33};

        const map = sequenceOf(a, b, c)
            .associateBy(
                it => it.k,
                it => it.v
            );

        expect(map).toEqual(
            new Map([
                [1, 11],
                [2, 22],
                [3, 33]
            ])
        );
    });

    it("should associate map by key and valueTransformer", () => {
        const a = {k: 1, v: 11};
        const b = {k: 2, v: 22};
        const c = {k: 3, v: 33};

        const map = sequenceOf(a, b, c)
            .associateBy(
                "k",
                it => it.v
            );

        expect(map).toEqual(
            new Map([
                [1, 11],
                [2, 22],
                [3, 33]
            ])
        );
    });

    it("latest entries should win in case of duplicates", () => {
        const a = {k: 1, v: 11};
        const b = {k: 2, v: 22};
        const c = {k: 3, v: 33};
        const d = {k: 2, v: 222};

        const map = sequenceOf(a, b, c, d)
            .associateBy(
                it => it.k,
                it => it.v
            );

        expect(map).toEqual(
            new Map([
                [1, 11],
                [2, 222],
                [3, 33]
            ])
        );
    });
});