import {asyncSequenceOf} from "../../../src/sequency";

describe("forEach", () => {
    it("should call action for each element", async () => {
        const array: string[] = [];
        await asyncSequenceOf(1, 2, 3)
            .forEachIndexed(async (index, value) => array.push(`${index}: ${value}`));

        expect(array).toEqual(["0: 1", "1: 2", "2: 3"]);
    });
});