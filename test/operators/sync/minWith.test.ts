import {emptySequence, sequenceOf} from "../../../src/sequency";

describe("minWith", () => {
    it("should return min element by comparator", () => {
        const num = sequenceOf({a: 1}, {a: 3}, {a: 2})
            .minWith((o1, o2) => o1.a > o2.a ? 1 : (o1.a < o2.a ? -1 : 0));

        expect(num).toEqual({a: 1});
    });

    it("should return null on empty sequence", () => {
        const num = emptySequence()
            .maxWith(() => 0);

        expect(num).toBeNull();
    });
});