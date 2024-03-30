import {asyncSequenceOf} from "../../../src/sequency";

describe("groupBy", () => {
    it("should group by keySelector", async () => {
        const a = {k: 1, v: 11} as const;
        const b = {k: 2, v: 22} as const;
        const c = {k: 3, v: 33} as const;
        const d = {k: 2, v: 222} as const;

        const map = await asyncSequenceOf<{k: (typeof a | typeof b | typeof c | typeof d)["k"], v: number}>(a, b, c, d)
            .groupBy(async it => it.k);

        expect(map).toEqual(
            new Map([
                [1, [a]],
                [2, [b, d]],
                [3, [c]]
            ])
        );
    });
});