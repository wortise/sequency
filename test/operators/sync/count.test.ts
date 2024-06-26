import {sequenceOf} from "../../../src/sequency";

describe("count", () => {
    it("should count results", () => {
        const num = sequenceOf(1, 2, 3).count();

        expect(num).toBe(3);
    });

    it("should evaluate predicate and count results", () => {
        const num = sequenceOf(1, 2, 3)
            .count(it => it > 1);

        expect(num).toBe(2);
    });
});