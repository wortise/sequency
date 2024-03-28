import {sequenceOf} from "../../../src/sequency";

describe("sortedBy", () => {
    it("should sort by the given key descending", () => {
        const a4 = {a: 4};
        const a1 = {a: 1};
        const a3 = {a: 3};
        const a23 = {a: 23};

        const array = sequenceOf(a4, a1, a3, a23)
            .sortedByDescending(it => it.a)
            .toArray();

        expect(array).toEqual([a23, a4, a3, a1]);
    });
});