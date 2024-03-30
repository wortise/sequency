import {range, sequenceOf} from "../../../src/sequency";

describe("distinct", () => {
    it("should dismiss duplicate items", () => {
        const result = sequenceOf(1, 1, 2, 3)
            .distinct()
            .toArray();

        expect(result).toEqual([1, 2, 3]);
    });

    it.skip("distinct performance test", () => {
        const t0 = Date.now();
        const result = range(1, 1_000_000)
            .distinct()
            .toArray();

        expect(result.length).toBe(1_000_000);
        const took = Date.now() - t0;
        console.log("Took %s ms", took);
    });
});
