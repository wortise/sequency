import {emptySequence} from "../src/sequency";

describe("emptySequence", () => {
    it("should return empty array", () => {
        const result = emptySequence().toArray();

        expect(result.length).toBe(0);
    });
});