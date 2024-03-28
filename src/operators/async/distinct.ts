import {createAsyncSequence, AsyncSequence} from "../../sequency";

class DistinctIterator<T> implements AsyncIterator<T> {
    private set: Set<T> = new Set();

    constructor(private readonly iterator: AsyncIterator<T>) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const sizeBeforeAdd = this.set.size;
            this.set.add(item.value);
            if (this.set.size > sizeBeforeAdd) {
                return {done: false, value: item.value};
            }
        }
        this.set.clear();
        return {done: true, value: undefined};
    }
}

export class Distinct {

    /**
     * Returns a new sequence which discards all duplicate elements.
     *
     * @returns {AsyncSequence<T>}
     */
    distinct<T>(this: AsyncSequence<T>): AsyncSequence<T> {
        return createAsyncSequence(new DistinctIterator(this.iterator));
    }

}
