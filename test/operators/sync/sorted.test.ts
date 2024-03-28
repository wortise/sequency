import {sequenceOf} from "../../../src/sequency";

describe("sorted", () => {
    it("should sort numbers ascending", () => {
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sorted()
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should sort strings ascending", () => {
        const array = sequenceOf("1", "4", "3", "5", "2")
            .sorted()
            .toArray();

        expect(array).toEqual(["1", "2", "3", "4", "5"]);
    });

    it("should sort numbers by natural order", () => {
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sorted(it => it.naturalOrder())
            .toArray();

        expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should sort numbers by natural order reversed", () => {
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sorted(it => it.naturalOrder()
                .reversed())
            .toArray();

        expect(array).toEqual([5, 4, 3, 2, 1]);
    });

    it("should sort numbers by reverse order", () => {
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sorted(it => it.reverseOrder())
            .toArray();

        expect(array).toEqual([5, 4, 3, 2, 1]);
    });

    it("should sort by given compareFn", () => {
        const fn = (a: number, b: number) => a < b ? 1 : a > b ? -1 : 0;
        const array = sequenceOf(1, 4, 3, 5, 2)
            .sorted(it => it.compare(fn))
            .toArray();

        expect(array).toEqual([5, 4, 3, 2, 1]);
    });

    it("should sort by comparing the selected property", () => {
        const array = sequenceOf({x: 2}, {x: 1}, {x: 3})
            .sorted(it => it.compareBy(it => it.x))
            .toArray();

        expect(array).toEqual([{x: 1}, {x: 2}, {x: 3}]);
    });

    it("should sort by comparing the given key", () => {
        const array = sequenceOf({x: 2}, {x: 1}, {x: 3})
            .sorted(it => it.compareBy("x"))
            .toArray();

        expect(array).toEqual([{x: 1}, {x: 2}, {x: 3}]);
    });

    it("should sort by comparing the selected property in reversed order", () => {
        const array = sequenceOf({x: 2}, {x: 1}, {x: 3})
            .sorted(it => it.compareBy(it => it.x)
                .reversed())
            .toArray();

        expect(array).toEqual([{x: 3}, {x: 2}, {x: 1}]);
    });

    it("should sort by comparing the selected property descending", () => {
        const array = sequenceOf({x: 2}, {x: 1}, {x: 3})
            .sorted(it => it.compareByDescending(it => it.x))
            .toArray();

        expect(array).toEqual([{x: 3}, {x: 2}, {x: 1}]);
    });

    it("should sort by comparing the given key descending", () => {
        const array = sequenceOf({x: 2}, {x: 1}, {x: 3})
            .sorted(it => it.compareByDescending("x"))
            .toArray();

        expect(array).toEqual([{x: 3}, {x: 2}, {x: 1}]);
    });

    it("should sort by comparing the selected property then other property", () => {
        const array = sequenceOf({x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1})
            .sorted(it => it.compareBy(it => it.x)
                .thenBy(it => it.y))
            .toArray();

        expect(array).toEqual([{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}]);
    });

    it("should sort by comparing the given key then other key", () => {
        const array = sequenceOf({x: 2, y: 2}, {x: 1, y: 2}, {x: 1, y: 1})
            .sorted(it => it.compareBy("x")
                .thenBy("y"))
            .toArray();

        expect(array).toEqual([{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}]);
    });

    it("should sort by comparing the selected property then other property with nulls last", () => {
        const array = sequenceOf({x: 2, y: 2}, undefined, null, {x: 1, y: 2}, {x: null, y: undefined}, {x: 1, y: 1})
            .sorted(it => it.compareBy(it => it?.x)
                .thenBy(it => it?.y))
            .toArray();

        expect(array).toEqual([{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: null, y: undefined}, null, undefined]);
    });

    it("should sort by comparing the given key then other key with nulls last", () => {
        const array = sequenceOf({x: 2, y: 2}, undefined, null, {x: 1, y: 2}, {x: null, y: undefined}, {x: 1, y: 1})
            .sorted(it => it.compareBy("x")
                .thenBy("y"))
            .toArray();

        expect(array).toEqual([{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: null, y: undefined}, null, undefined]);
    });

    it("should order nulls first", () => {
        const array = sequenceOf({x: 2}, null, {x: 1}, {x: 3}, null)
            .sorted(it => it.nullsFirst())
            .toArray();

        expect(array).toEqual([null, null, {x: 2}, {x: 1}, {x: 3}]);
    });

    it("should order nulls last", () => {
        const array = sequenceOf({x: 2}, null, {x: 1}, {x: 3}, null)
            .sorted(it => it.nullsLast())
            .toArray();

        expect(array).toEqual([{x: 2}, {x: 1}, {x: 3}, null, null]);
    });

    it("should order nulls first then by descending selected property", () => {
        const array = sequenceOf({x: 2}, null, {x: 1}, {x: 3}, null)
            .sorted(it => it.nullsFirst()
                .thenByDescending(it => it?.x))
            .toArray();

        expect(array).toEqual([null, null, {x: 3}, {x: 2}, {x: 1}]);
    });

    it("should order nulls first then by descending key", () => {
        const array = sequenceOf({x: 2}, null, {x: 1}, {x: 3}, null)
            .sorted(it => it.nullsFirst()
                .thenByDescending("x"))
            .toArray();

        expect(array).toEqual([null, null, {x: 3}, {x: 2}, {x: 1}]);
    });
});