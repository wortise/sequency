import {createAsyncSequence, AsyncSequence} from "../../sequency";

class FilterIterator<T> implements AsyncIterator<T> {
    constructor(private readonly predicate: (item: T) => Promise<boolean> | boolean,
                private readonly iterator: AsyncIterator<T>) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (await this.predicate(item.value)) {
                return {done: false, value: item.value};
            }
        }
        return {done: true, value: undefined};
    }
}

export class Filter {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(item: T) => Promise<boolean> | boolean} predicate
     * @returns {AsyncSequence<T>}
     */
    filter<T>(this: AsyncSequence<T>, predicate: (item: T) => Promise<boolean> | boolean): AsyncSequence<T> {
        return createAsyncSequence(new FilterIterator(predicate, this.iterator));
    }

}