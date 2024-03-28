import {createAsyncSequence, AsyncSequence} from "../../sequency";

class ZipIterator<T, S> implements AsyncIterator<[T, S]> {
    constructor(private readonly iterator1: AsyncIterator<T>,
                private readonly iterator2: AsyncIterator<S>) {
    }

    async next(value?: any): Promise<IteratorResult<[T, S]>> {
        const item1 = await this.iterator1.next();
        const item2 = await this.iterator2.next();
        if (item1.done || item2.done) {
            return {done: true, value: undefined};
        } else {
            return {done: false, value: [item1.value, item2.value]};
        }
    }

}

export class Zip {

    /**
     * Returns a new sequence consisting of pairs built the elements of both sequences
     * with the same index. The resulting sequence has the length of the shortest input
     * sequence. All other elements are discarded.
     *
     * @param {AsyncSequence<S>} other
     * @returns {AsyncSequence<[T , S]>}
     */
    zip<T, S>(this: AsyncSequence<T>, other: AsyncSequence<S>): AsyncSequence<[T, S]> {
        return createAsyncSequence(new ZipIterator(this.iterator, other.iterator));
    }

}