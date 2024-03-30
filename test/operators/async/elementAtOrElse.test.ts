import {asyncSequenceOf} from "../../../src/sequency";

describe("elementAtOrElse", () => {
    it("should return element at first index", async () => {
        const item = await asyncSequenceOf(1, 2, 3)
            .elementAtOrElse(0, async () => -1);

        expect(item).toBe(1);
    });

    it("should return element at middle index", async () => {
        const item = await asyncSequenceOf(1, 2, 3)
            .elementAtOrElse(1, async () => -1);

        expect(item).toBe(2);
    });

    it("should return element at last index", async () => {
        const item = await asyncSequenceOf(1, 2, 3)
            .elementAtOrElse(2, async () => -1);

        expect(item).toBe(3);
    });

    it("should return default value when index out of bounds", async () => {
        const item = await asyncSequenceOf(1, 2, 3)
            .elementAtOrElse(3, async () => 1234);

        expect(item).toBe(1234);
    });
});