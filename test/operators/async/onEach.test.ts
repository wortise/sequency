import {asyncSequenceOf} from "../../../src/sequency";

describe("onEach", () => {
    it("should call action for each element", async () => {
        const array: number[] = [];
        const result = await asyncSequenceOf(1, 2, 3)
            .onEach(async it => array.push(it))
            .toArray();

        expect(array).toEqual([1, 2, 3]);
        expect(result).toEqual(array);
    });
});