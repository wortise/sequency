import {sequenceOf} from "../../../src/sequency";

describe("map", () => {
    it("should map numbers to strings", () => {
        const array = sequenceOf(1, 2, 3)
            .map(it => `num ${it}`)
            .toArray();

        expect(array).toEqual(["num 1", "num 2", "num 3"]);
    });
});