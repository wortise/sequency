import {createAsyncSequence, AsyncSequence} from "../../sequency";

class DistinctByIterator<T, K> implements AsyncIterator<T> {
    private set: Set<K> = new Set();

    constructor(private readonly iterator: AsyncIterator<T>,
                private readonly selector: (item: T) => Promise<K> | K) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const key = await this.selector(item.value);
            const sizeBeforeAdd = this.set.size;
            this.set.add(key);
            if (this.set.size > sizeBeforeAdd) {
                return {done: false, value: item.value};
            }
        }
        this.set.clear();
        return {done: true, value: undefined};
    }
}

export class DistinctBy {

    /**
     * Returns a new sequence which discards all elements with duplicate items determined
     * by the given `selector`.
     *
     * @param {(item: T) => Promise<K> | K} selector
     * @returns {AsyncSequence<T>}
     */
    distinctBy<T, K>(this: AsyncSequence<T>, selector: (item: T) => Promise<K> | K): AsyncSequence<T> {
        return createAsyncSequence(new DistinctByIterator(this.iterator, selector));
    }

}
