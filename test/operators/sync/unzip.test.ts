import {sequenceOf} from "../../../src/sequency";

describe("unzip", () => {
    it("should unzip items", () => {
        const [first, second] = sequenceOf("a", "b", "c")
            .zip(sequenceOf(1, 2, 3))
            .unzip();

        expect(first).toEqual(["a", "b", "c"]);
        expect(second).toEqual([1, 2, 3]);
    });
});