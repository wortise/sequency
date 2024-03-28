import {createAsyncSequence, AsyncSequence} from "../../sequency";
import IndexedValue from "../../IndexedValue";

class IndexIterator<T> implements AsyncIterator<IndexedValue<T>> {
    private index = -1;

    constructor(private readonly iterator: AsyncIterator<T>) {
    }

    async next(value?: any): Promise<IteratorResult<IndexedValue<T>>> {
        const item = await this.iterator.next();
        if (item.done) {
            return {done: true, value: undefined};
        }
        this.index++;
        return {
            done: false,
            value: {
                index: this.index,
                value: item.value
            }
        };
    }
}

export class WithIndex {

    /**
     * Returns a new sequence consisting of indexed values for all original elements.
     *
     * @returns {AsyncSequence<IndexedValue<T>>}
     */
    withIndex<T>(this: AsyncSequence<T>): AsyncSequence<IndexedValue<T>> {
        return createAsyncSequence(new IndexIterator(this.iterator));
    }

}