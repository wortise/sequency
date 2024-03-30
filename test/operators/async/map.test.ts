import {asyncSequenceOf} from "../../../src/sequency";

describe("map", () => {
    it("should map numbers to strings", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .map(async it => `num ${it}`)
            .toArray();

        expect(array).toEqual(["num 1", "num 2", "num 3"]);
    });
});