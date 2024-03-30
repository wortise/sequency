import {asyncSequenceOf} from "../../../src/sequency";

describe("forEach", () => {
    it("should call action for each element", async () => {
        const array: number[] = [];
        await asyncSequenceOf(1, 2, 3)
            .forEach(async it => array.push(it));

        expect(array).toEqual([1, 2, 3]);
    });
});