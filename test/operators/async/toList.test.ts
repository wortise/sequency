import {asAsyncSequence, asyncSequenceOf} from "../../../src/sequency";

describe("toList", () => {
    it("should return new array", async () => {
        const input = [1, 2, 3];
        const array = await asAsyncSequence(input)
            .toList();

        expect(array).not.toBe(input);
        expect(array).toEqual(input);
    });

    it("should append items to passed array", async () => {
        const array = [1];
        const result = await asyncSequenceOf(2, 3, 4)
            .toList(array);

        expect(result).toBe(array);
        expect(result).toEqual([1, 2, 3, 4]);
    });
});