import {asyncSequenceOf} from "../../../src/sequency";

describe("unzip", () => {
    it("should unzip items", async () => {
        const [first, second] = await asyncSequenceOf("a", "b", "c")
            .zip(asyncSequenceOf(1, 2, 3))
            .unzip();

        expect(first).toEqual(["a", "b", "c"]);
        expect(second).toEqual([1, 2, 3]);
    });
});