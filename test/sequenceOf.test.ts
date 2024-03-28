import {sequenceOf} from "../src/sequency";

describe("sequenceOf", () => {
    it("filter-map-toArray", () => {
        const array = sequenceOf(1, 2, 3)
            .filter(it => it > 1)
            .map(it => `num ${it}`)
            .toArray();

        expect(array).toEqual(["num 2", "num 3"]);
    });
});