import {asyncSequenceOf} from "../../../src/sequency";

describe("distinctBy", () => {
    it("should dismiss items with duplicate selections", async () => {
        const result = await asyncSequenceOf({a: 1}, {a: 2}, {a: 1}, {a: 3})
            .distinctBy(async it => it.a)
            .toArray();

        expect(result).toEqual([
            {a: 1},
            {a: 2},
            {a: 3}
        ]);
    });
});