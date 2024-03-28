import {sequenceOf} from "../../../src/sequency";

describe("mapNotNull", () => {
    it("should map to non-null items", () => {
        const a1 = {a: 1};
        const a2 = {a: null};
        const a3 = {a: null};
        const a4 = {a: 4};

        const array = sequenceOf<{a: number | null}>(a1, a2, a3, a4)
            .mapNotNull(it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });
});