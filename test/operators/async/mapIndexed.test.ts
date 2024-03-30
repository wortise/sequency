import {asyncSequenceOf} from "../../../src/sequency";

describe("mapIndexed", () => {
    it("should map elements by index and value", async () => {
        const array = await asyncSequenceOf(1, 2, 3)
            .mapIndexed(async (index, value) => `${index}: ${value}`)
            .toArray();

        expect(array).toEqual(["0: 1", "1: 2", "2: 3"]);
    });
});