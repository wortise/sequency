import {createAsyncSequence, AsyncSequence} from "../../sequency";

class TakeWhileIterator<T> implements AsyncIterator<T> {
    constructor(private readonly iterator: AsyncIterator<T>,
                private readonly predicate: (item: T) => Promise<boolean> | boolean) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        const item = await this.iterator.next();
        if (!item.done) {
            if (await this.predicate(item.value)) {
                return {done: false, value: item.value};
            }
        }
        return {done: true, value: undefined};
    }
}

export class TakeWhile {

    /**
     * Takes all elements of the sequence as long as the given `predicate` evaluates to true.
     *
     * @param {(item: T) => Promise<boolean> | boolean} predicate
     * @returns {AsyncSequence<T>}
     */
    takeWhile<T>(this: AsyncSequence<T>, predicate: (item: T) => Promise<boolean> | boolean): AsyncSequence<T> {
        return createAsyncSequence(new TakeWhileIterator(this.iterator, predicate));
    }

}