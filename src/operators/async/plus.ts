import {asAsyncIterable} from "../../internal";
import {createAsyncSequence, isAsyncSequence, AsyncSequence} from "../../sequency";

class AppendIterator<T> implements AsyncIterator<T> {
    constructor(private readonly first: AsyncIterator<T>,
                private readonly second: AsyncIterator<T>) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        const item1 = await this.first.next();
        if (!item1.done) {
            return {done: false, value: item1.value};
        }
        const item2 = await this.second.next();
        if (!item2.done) {
            return {done: false, value: item2.value};
        }
        return {done: true, value: undefined};
    }
}

export class Plus {

    /**
     * Appends the given `element` to the end of the sequence and returns a new sequence.
     *
     * @param {T} element
     * @returns {AsyncSequence<T>}
     */
    plus<T>(this: AsyncSequence<T>, element: T): AsyncSequence<T>;

    /**
     * Appends the given array to the end of the sequence and returns a new sequence.
     *
     * @param {T[]} other
     * @returns {AsyncSequence<T>}
     */
    plus<T>(this: AsyncSequence<T>, other: T[]): AsyncSequence<T>;

    /**
     * Appends the given sequence to the end of the sequence and returns a new sequence.
     *
     * @param {AsyncSequence<T>} other
     * @returns {AsyncSequence<T>}
     */
    plus<T>(this: AsyncSequence<T>, other: AsyncSequence<T>): AsyncSequence<T>;

    plus<T>(this: AsyncSequence<T>, data: T | AsyncSequence<T> | T[]): AsyncSequence<T> {
        if (isAsyncSequence(data)) {
            return createAsyncSequence(new AppendIterator(this.iterator, data.iterator));
        } else if (data instanceof Array) {
            return createAsyncSequence(new AppendIterator(this.iterator, asAsyncIterable(data)[Symbol.asyncIterator]()));
        } else {
            return createAsyncSequence(new AppendIterator(this.iterator, asAsyncIterable([data])[Symbol.asyncIterator]()));
        }
    }

}