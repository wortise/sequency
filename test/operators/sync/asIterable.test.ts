import {sequenceOf} from "../../../src/sequency";

describe("asIterable", () => {
    it("should return an iterable object conforming to the iterator-protocol", () => {
        const iterable = sequenceOf(1, 2, 3, 4, 5)
            .filter(it => it % 2 === 1)
            .asIterable();

        const iterator = iterable[Symbol.iterator]();
        const results = [1, 3, 5];

        for (let i = 0; i < results.length; i++) {
            const result = iterator.next();
            expect(result.value).toBe(results[i]);
        }

        expect(iterator.next().done).toBe(true);
    });
});