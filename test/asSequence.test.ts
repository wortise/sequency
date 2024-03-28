import {asSequence} from "../src/sequency";

describe("asSequence", () => {
    it("should create sequence from array", () => {
        const array = asSequence([1, 2, 3])
            .filter(it => it > 1)
            .map(it => `num ${it}`)
            .toArray();

        expect(array).toEqual(["num 2", "num 3"]);
    });

    it("should create sequence from object keys", () => {
        const keys = Object.keys({"a": 1, "b": 2, "c": 3});
        const array = asSequence(keys)
            .toArray();

        expect(array).toEqual(["a", "b", "c"]);
    });

    it("should create sequence from object values", () => {
        const values = Object.values({"a": 1, "b": 2, "c": 3});
        const array = asSequence(values)
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });

    it("should create sequence from set", () => {
        const set = new Set<number>();
        set.add(1);
        set.add(2);
        set.add(3);

        const array = asSequence(set)
            .toArray();

        expect(array).toEqual([1, 2, 3]);
    });

    it("should create sequence from map", () => {
        const map = new Map<string, number>();
        map.set("a", 1);
        map.set("b", 2);
        map.set("c", 3);

        const array = asSequence(map)
            .toArray();

        expect(array)
            .toEqual([
                ["a", 1],
                ["b", 2],
                ["c", 3]
            ]);
    });

    it("should throw understandable error message if input is undefined", () => {
        expect(
            () => asSequence(undefined as unknown as number[]).toArray()
        ).toThrow("Cannot create sequence for non-existing input: undefined");
    });

    it("should throw understandable error message if input is null", () => {
        expect(
            () => asSequence(null as unknown as number[]).toArray()
        ).toThrow("Cannot create sequence for non-existing input: null");
    });

    it("should throw understandable error message if input is not iterable", () => {
        expect(
            () => asSequence({} as unknown as number[]).toArray()
        ).toThrow("Cannot create sequence for non-iterable input: [object Object]");
    });
});