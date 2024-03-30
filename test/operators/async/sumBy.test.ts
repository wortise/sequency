import {asyncSequenceOf} from "../../../src/sequency";

describe("sumBy", () => {
    it("should sum all selected numbers", async () => {
        const result = await asyncSequenceOf({a: 2}, {a: 4}, {a: 6})
            .sumBy(async it => it.a);

        expect(result).toBe(12);
    });
});