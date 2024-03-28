import {createAsyncSequence, AsyncSequence} from "../../sequency";

class DropWhileIterator<T> implements AsyncIterator<T> {
    private dropping = true;

    constructor(private readonly iterator: AsyncIterator<T>,
                private readonly predicate: (item: T) => Promise<boolean> | boolean) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (!this.dropping) {
                return {done: false, value: item.value};
            }
            if (!await this.predicate(item.value)) {
                this.dropping = false;
                return {done: false, value: item.value};
            }
        }
        return {done: true, value: undefined};
    }
}

export class DropWhile {

    /**
     * Drops all elements of the sequence as long as the given `predicate` evaluates to true.
     *
     * @param {(item: T) => Promise<boolean> | boolean} predicate
     * @returns {AsyncSequence<T>}
     */
    dropWhile<T>(this: AsyncSequence<T>, predicate: (item: T) => Promise<boolean> | boolean): AsyncSequence<T> {
        return createAsyncSequence(new DropWhileIterator(this.iterator, predicate));
    }

}