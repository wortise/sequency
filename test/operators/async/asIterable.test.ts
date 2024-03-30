import {asyncSequenceOf} from "../../../src/sequency";

describe("asIterable", () => {
    it("should return an iterable object conforming to the iterator-protocol", async () => {
        const iterable = asyncSequenceOf(1, 2, 3, 4, 5)
            .filter(async it => it % 2 === 1)
            .asIterable();

        const iterator = iterable[Symbol.asyncIterator]();
        const results = [1, 3, 5];

        for (let i = 0; i < results.length; i++) {
            const result = await iterator.next();
            expect(result.value).toBe(results[i]);
        }

        expect((await iterator.next()).done).toBe(true);
    });
});