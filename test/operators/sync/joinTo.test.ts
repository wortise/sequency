import {sequenceOf} from "../../../src/sequency";

describe("joinTo", () => {
    it("should join to given string", () => {
        const result = sequenceOf(1, 2, 3)
            .joinTo({value: "List: ", prefix: "[ ", postfix: " ]"});

        expect(result).toBe("List: [ 1, 2, 3 ]");
    });
});