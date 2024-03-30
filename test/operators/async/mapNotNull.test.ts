import {asyncSequenceOf} from "../../../src/sequency";

describe("mapNotNull", () => {
    it("should map to non-null items", async () => {
        const a1 = {a: 1};
        const a2 = {a: null};
        const a3 = {a: null};
        const a4 = {a: 4};

        const array = await asyncSequenceOf<{a: number | null}>(a1, a2, a3, a4)
            .mapNotNull(async it => it.a)
            .toArray();

        expect(array).toEqual([1, 4]);
    });
});