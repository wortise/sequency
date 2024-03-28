import {createAsyncSequence, AsyncSequence} from "../../sequency";

class FlatMapIterator<S, T> implements AsyncIterator<T> {
    private current: AsyncIterator<T> | undefined;

    constructor(private readonly transform: (item: S) => Promise<AsyncSequence<T>> | AsyncSequence<T>,
                private readonly iterator: AsyncIterator<S>) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        if (this.current != null) {
            const item = await this.current.next();
            if (!item.done) {
                return item;
            }
        }
        const next = await this.iterator.next();
        if (!next.done) {
            const sequence = await this.transform(next.value);
            this.current = sequence.iterator;
            return this.next();
        }
        return {done: true, value: undefined};
    }
}

export class FlatMap {

    /**
     * Transforms each element into a sequence of items and returns a flat single sequence of all those items.
     *
     * @param {(value: S) => Promise<AsyncSequence<T>> | AsyncSequence<T>} transform
     * @returns {AsyncSequence<T>}
     */
    flatMap<S, T>(this: AsyncSequence<S>, transform: (value: S) => Promise<AsyncSequence<T>> | AsyncSequence<T>): AsyncSequence<T> {
        return createAsyncSequence(new FlatMapIterator(transform, this.iterator));
    }

}