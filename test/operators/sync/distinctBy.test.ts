import {sequenceOf} from "../../../src/sequency";

describe("distinctBy", () => {
    it("should dismiss items with duplicate selections", () => {
        const result = sequenceOf({a: 1}, {a: 2}, {a: 1}, {a: 3})
            .distinctBy(it => it.a)
            .toArray();

        expect(result).toEqual([
            {a: 1},
            {a: 2},
            {a: 3}
        ]);
    });
});