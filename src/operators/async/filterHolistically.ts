import {createAsyncSequence, AsyncSequence} from "../../sequency";

class FilterIterator<T> implements AsyncIterator<T> {
    private readonly data: T[] = [];
    /** Iterator to initialize data with */
    private iterator: AsyncIterator<T> | null = null;
    /** Current data index */
    private index: number = 0;

    constructor(iterator: AsyncIterator<T>, private readonly predicate: (item: T, index: number, array: Readonly<T[]>) => Promise<boolean> | boolean) {
        this.iterator = iterator;
    }

    private async init() {
        if (this.iterator != null) {
            for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
                if (!item.done) {
                    this.data.push(item.value);
                }
            }
            Object.freeze(this.data);
            this.iterator = null;
        }
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        await this.init();
        for (let item = this.data[this.index++]; this.index < this.data.length; item = this.data[this.index++]) {
            if (await this.predicate(item, this.index, this.data)) {
                return {done: false, value: item};
            }
        }
        return {done: true, value: undefined};
    }
}

export class FilterHolistically {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(value: T, index: number, array: T[]) => Promise<boolean> | boolean} predicate
     * @returns {AsyncSequence<T>}
     */
    filterHolistically<T>(this: AsyncSequence<T>, predicate: (item: T, index: number, array: Readonly<T[]>) => Promise<boolean> | boolean): AsyncSequence<T> {
        return createAsyncSequence(new FilterIterator(this.iterator, predicate));
    }

}