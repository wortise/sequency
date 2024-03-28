import {asSequence} from "../../../src/sequency";

describe("toMap", () => {
    it("should return items as new map", () => {
        const key1 = {k: 1};
        const key2 = {k: 2};
        const key3 = {k: 3};
        const array: [object, string][] = [[key1, "a"], [key2, "b"], [key3, "c"]];
        const map = asSequence(array)
            .toMap();

        expect(map).toEqual(
            new Map([
                [key1, "a"],
                [key2, "b"],
                [key3, "c"]
            ])
        );
    });

    it("should append items to passed map", () => {
        const key0 = {k: 0};
        const key1 = {k: 1};
        const key2 = {k: 2};
        const key3 = {k: 3};

        const existingMap = new Map();
        existingMap.set(key0, "_");

        const array: [object, string][] = [[key1, "a"], [key2, "b"], [key3, "c"]];
        const result = asSequence(array)
            .toMap(existingMap);

        expect(result).toEqual(
            new Map([
                [key0, "_"],
                [key1, "a"],
                [key2, "b"],
                [key3, "c"]
            ])
        );
    });
});